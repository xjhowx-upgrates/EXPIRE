/*
  # EXPIRE - Schema Completo da Plataforma de Jogos

  ## 1. Tabelas Principais
  - `profiles` - Perfis dos usuários
  - `time_tracking` - Controle de tempo dos usuários
  - `game_sessions` - Sessões de jogos
  - `achievements` - Sistema de conquistas
  - `user_achievements` - Conquistas dos usuários
  - `leaderboard` - Ranking global

  ## 2. Segurança
  - RLS habilitado em todas as tabelas
  - Políticas de segurança para cada operação
  - Triggers automáticos para atualizações

  ## 3. Funcionalidades
  - Sistema de tempo automático
  - Ranking em tempo real
  - Conquistas progressivas
  - Auditoria completa
*/

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de perfis dos usuários
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  total_time_minutes integer DEFAULT 120,
  total_points integer DEFAULT 0,
  games_played integer DEFAULT 0,
  total_wins integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de controle de tempo
CREATE TABLE IF NOT EXISTS time_tracking (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  time_added integer NOT NULL,
  time_spent integer DEFAULT 0,
  reason text NOT NULL,
  game_type text,
  created_at timestamptz DEFAULT now()
);

-- Tabela de conquistas disponíveis
CREATE TABLE IF NOT EXISTS achievements (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  rarity text NOT NULL CHECK (rarity IN ('Comum', 'Raro', 'Épico', 'Lendário')),
  points integer NOT NULL,
  icon text,
  condition_type text NOT NULL,
  condition_value integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Tabela de conquistas dos usuários
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Tabela de sessões de jogos
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  game_type text NOT NULL,
  time_cost integer NOT NULL,
  result text,
  score integer DEFAULT 0,
  multiplier decimal DEFAULT 1.0,
  won boolean DEFAULT false,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  duration_seconds integer
);

-- Tabela de ranking
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  username text NOT NULL,
  total_points integer DEFAULT 0,
  games_played integer DEFAULT 0,
  win_rate decimal DEFAULT 0.0,
  achievements_count integer DEFAULT 0,
  rank_position integer,
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para profiles
CREATE POLICY "Usuários podem ver próprio perfil"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Perfis públicos visíveis para ranking"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

-- Políticas para time_tracking
CREATE POLICY "Usuários podem ver próprio histórico de tempo"
  ON time_tracking FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Sistema pode inserir registros de tempo"
  ON time_tracking FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Políticas para achievements
CREATE POLICY "Conquistas são públicas"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- Políticas para user_achievements
CREATE POLICY "Usuários podem ver próprias conquistas"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Sistema pode inserir conquistas"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Políticas para game_sessions
CREATE POLICY "Usuários podem ver próprias sessões"
  ON game_sessions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Usuários podem criar sessões"
  ON game_sessions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Usuários podem atualizar próprias sessões"
  ON game_sessions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Políticas para leaderboard
CREATE POLICY "Ranking é público"
  ON leaderboard FOR SELECT
  TO authenticated
  USING (true);

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leaderboard_updated_at
  BEFORE UPDATE ON leaderboard
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para atualizar ranking
CREATE OR REPLACE FUNCTION update_leaderboard()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO leaderboard (user_id, username, total_points, games_played, win_rate, achievements_count)
  SELECT 
    p.id,
    COALESCE(p.username, p.full_name, split_part(p.email, '@', 1)),
    p.total_points,
    p.games_played,
    CASE 
      WHEN p.games_played > 0 THEN (p.total_wins::decimal / p.games_played::decimal) * 100
      ELSE 0
    END,
    COALESCE(ua.achievement_count, 0)
  FROM profiles p
  LEFT JOIN (
    SELECT user_id, COUNT(*) as achievement_count
    FROM user_achievements
    GROUP BY user_id
  ) ua ON p.id = ua.user_id
  WHERE p.id = NEW.id
  ON CONFLICT (user_id) DO UPDATE SET
    username = EXCLUDED.username,
    total_points = EXCLUDED.total_points,
    games_played = EXCLUDED.games_played,
    win_rate = EXCLUDED.win_rate,
    achievements_count = EXCLUDED.achievements_count,
    updated_at = now();

  -- Atualizar posições do ranking
  WITH ranked_users AS (
    SELECT 
      user_id,
      ROW_NUMBER() OVER (ORDER BY total_points DESC, achievements_count DESC, win_rate DESC) as new_rank
    FROM leaderboard
  )
  UPDATE leaderboard 
  SET rank_position = ranked_users.new_rank
  FROM ranked_users
  WHERE leaderboard.user_id = ranked_users.user_id;

  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar ranking
CREATE TRIGGER update_leaderboard_trigger
  AFTER UPDATE OF total_points, games_played, total_wins ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_leaderboard();

-- Função para adicionar tempo automaticamente
CREATE OR REPLACE FUNCTION add_hourly_time_bonus()
RETURNS void AS $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN 
    SELECT id FROM profiles 
    WHERE total_time_minutes < 480 -- Máximo de 480 minutos
  LOOP
    UPDATE profiles 
    SET total_time_minutes = LEAST(total_time_minutes + 10, 480)
    WHERE id = user_record.id;
    
    INSERT INTO time_tracking (user_id, time_added, reason)
    VALUES (user_record.id, 10, 'Bônus automático por hora');
  END LOOP;
END;
$$ language 'plpgsql';

-- Inserir conquistas padrão
INSERT INTO achievements (name, description, rarity, points, condition_type, condition_value) VALUES
('Primeiro Jogo', 'Jogue seu primeiro jogo na plataforma', 'Comum', 10, 'games_played', 1),
('Iniciante', 'Jogue 5 jogos na plataforma', 'Comum', 25, 'games_played', 5),
('Jogador Experiente', 'Jogue 25 jogos na plataforma', 'Raro', 100, 'games_played', 25),
('Sortudo', 'Ganhe 10 jogos', 'Raro', 150, 'total_wins', 10),
('Veterano', 'Jogue 50 jogos na plataforma', 'Épico', 250, 'games_played', 50),
('Jackpot', 'Ganhe 25 jogos', 'Épico', 500, 'total_wins', 25),
('Mestre dos Jogos', 'Jogue 100 jogos na plataforma', 'Lendário', 750, 'games_played', 100),
('Lenda', 'Ganhe 50 jogos', 'Lendário', 1000, 'total_wins', 50)
ON CONFLICT DO NOTHING;

-- Função para verificar conquistas
CREATE OR REPLACE FUNCTION check_achievements(user_uuid uuid)
RETURNS void AS $$
DECLARE
  user_stats RECORD;
  achievement_record RECORD;
BEGIN
  -- Buscar estatísticas do usuário
  SELECT games_played, total_wins, total_points
  INTO user_stats
  FROM profiles
  WHERE id = user_uuid;

  -- Verificar cada conquista
  FOR achievement_record IN 
    SELECT * FROM achievements
  LOOP
    -- Verificar se o usuário já tem a conquista
    IF NOT EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = user_uuid AND achievement_id = achievement_record.id
    ) THEN
      -- Verificar condições
      IF (achievement_record.condition_type = 'games_played' AND user_stats.games_played >= achievement_record.condition_value) OR
         (achievement_record.condition_type = 'total_wins' AND user_stats.total_wins >= achievement_record.condition_value) OR
         (achievement_record.condition_type = 'total_points' AND user_stats.total_points >= achievement_record.condition_value) THEN
        
        -- Desbloquear conquista
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (user_uuid, achievement_record.id);
        
        -- Adicionar pontos
        UPDATE profiles 
        SET total_points = total_points + achievement_record.points
        WHERE id = user_uuid;
      END IF;
    END IF;
  END LOOP;
END;
$$ language 'plpgsql';

-- Trigger para verificar conquistas após atualizações
CREATE OR REPLACE FUNCTION trigger_check_achievements()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM check_achievements(NEW.id);
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER check_achievements_trigger
  AFTER UPDATE OF games_played, total_wins ON profiles
  FOR EACH ROW EXECUTE FUNCTION trigger_check_achievements();