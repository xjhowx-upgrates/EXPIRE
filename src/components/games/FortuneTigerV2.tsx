import React, { useRef, useState } from 'react';
import './FortuneTigerV2.css';
import logo from '../../slots-exemplo/Fortune-tiger/img/cassinopix-logo.svg';
import espadilha from '../../slots-exemplo/Fortune-tiger/img/espadilha.svg';
import popupImg from '../../slots-exemplo/Fortune-tiger/img/popup.png';
import { symbolImages, FortuneTigerSymbol } from './FortuneTigerSymbols';
import { useAuth } from '../../hooks/useAuth';
import { useGame } from '../../hooks/useGame';
import VideoPlayer from './VideoPlayer';

const COLS = 3;
const ROWS = 3;
const SYMBOLS: FortuneTigerSymbol[] = ['tigre', 'dragão', 'moeda', 'lanterna', 'cereja'];

const MIN_BET = 2;
const MAX_BET = 20;

const FortuneTigerV2: React.FC = () => {
  const { userProfile } = useAuth();
  const { betMinutes, isWatchingVideo, currentVideoId, setCurrentVideoId } = useGame();
  const [stage, setStage] = useState<'start'|'playing'|'end'>('start');
  const [betAmount, setBetAmount] = useState<number>(MIN_BET);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<FortuneTigerSymbol[][]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState<string|null>(null);
  const [win, setWin] = useState<boolean|null>(null);

  // Refs para sons (exemplo)
  const bgSound = useRef<HTMLAudioElement>(null);
  const clickSound = useRef<HTMLAudioElement>(null);
  const spinSound = useRef<HTMLAudioElement>(null);
  const coinsSound = useRef<HTMLAudioElement>(null);

  const wallet = userProfile?.minutes || 0;

  // Função para iniciar o jogo
  const handleStart = () => {
    setStage('playing');
    if (bgSound.current) {
      bgSound.current.volume = 0.3;
      bgSound.current.play();
    }
  };

  // Ajusta aposta
  const increaseBet = () => setBetAmount(b => Math.min(MAX_BET, b + 1));
  const decreaseBet = () => setBetAmount(b => Math.max(MIN_BET, b - 1));

  // Lógica de vitória: linha do meio igual = vitória
  const checkWin = (result: FortuneTigerSymbol[][]) => {
    if (result.length < 3) return false;
    const midRow = [result[0][1], result[1][1], result[2][1]];
    return midRow.every(sym => sym === midRow[0]);
  };

  // Girar rolos
  const handleSpin = async () => {
    if (isSpinning || wallet < betAmount) return;
    setIsSpinning(true);
    setMessage(null);
    setWin(null);
    if (clickSound.current) clickSound.current.play();
    if (spinSound.current) spinSound.current.play();

    // Debita aposta
    const betOk = await betMinutes('fortune-tiger', betAmount);
    if (!betOk) {
      setIsSpinning(false);
      setMessage('Saldo insuficiente ou erro ao apostar.');
      return;
    }

    setTimeout(() => {
      // Gera resultado
      const result: FortuneTigerSymbol[][] = Array.from({ length: COLS }, () =>
        Array.from({ length: ROWS }, () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
      );
      setSpinResult(result);
      const isWin = checkWin(result);
      setWin(isWin);
      setIsSpinning(false);
      if (isWin) {
        setMessage('Parabéns! Você ganhou o dobro da aposta!');
        setShowPopup(true);
        if (coinsSound.current) coinsSound.current.play();
      } else {
        setMessage('Você perdeu! Assista um vídeo para ganhar mais minutos.');
        // O contexto já seta o vídeo ao perder. Só precisamos exibir o modal.
      }
    }, 1500);
  };

  return (
    <div className="ftiger-root">
      {/* Sons do jogo */}
      <audio ref={bgSound} src="/sounds/bg.mp3" loop />
      <audio ref={clickSound} src="/sounds/click.mp3" />
      <audio ref={spinSound} src="/sounds/spin.mp3" />
      <audio ref={coinsSound} src="/sounds/coins.mp3" />

      {stage === 'start' && (
        <div className="ftiger-stage1">
          <img src={logo} alt="Logo" className="ftiger-logo" />
          <button className="ftiger-btn" onClick={handleStart}>Começar</button>
        </div>
      )}
      {stage === 'playing' && (
        <div className="ftiger-stage2">
          <div className="ftiger-wallet">Minutos: {wallet}</div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <button className="ftiger-btn" style={{padding:'0.4rem 1.3rem'}} onClick={decreaseBet} disabled={isSpinning || betAmount<=MIN_BET}>-</button>
            <span className="bg-gray-800 px-4 py-1 text-white rounded">{betAmount} min</span>
            <button className="ftiger-btn" style={{padding:'0.4rem 1.3rem'}} onClick={increaseBet} disabled={isSpinning || betAmount>=MAX_BET || betAmount>=wallet}>+</button>
          </div>
          <div className="ftiger-slot">
            {Array.from({ length: COLS }).map((_, i) => (
              <div className="ftiger-col" key={i}>
                {Array.from({ length: ROWS }).map((_, j) => (
                  <div className={`ftiger-symbol${win && j === 1 ? ' ftiger-symbol-win' : ''}`} key={j}>
                    {spinResult[i]?.[j] ? (
                      <img
                        src={symbolImages[spinResult[i][j]]}
                        alt={spinResult[i][j]}
                        style={{ width: '90%', height: '90%', objectFit: 'contain' }}
                      />
                    ) : (
                      <span style={{ color: '#fff', opacity: 0.5 }}>?</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button className="ftiger-btn" onClick={handleSpin} disabled={isSpinning || wallet < betAmount}>
            {isSpinning ? 'Girando...' : 'Girar'}
          </button>
          {message && <div className={`mt-3 text-center font-bold ${win ? 'text-green-400' : 'text-red-400'}`}>{message}</div>}
        </div>
      )}
      {/* Sons do jogo */}
      <audio ref={bgSound} src="/sounds/bg.mp3" loop />
      <audio ref={clickSound} src="/sounds/click.mp3" />
      <audio ref={spinSound} src="/sounds/spin.mp3" />
      <audio ref={coinsSound} src="/sounds/coins.mp3" />

      {/* Popup de vitória */}
      {showPopup && (
        <div className="ftiger-popup">
          <img src={popupImg} alt="Popup" />
          <button className="ftiger-btn mt-4" onClick={() => setShowPopup(false)}>Fechar</button>
        </div>
      )}
      {/* Modal de vídeo ao perder */}
      {isWatchingVideo && currentVideoId && (
        <VideoPlayer
          videoId={currentVideoId}
        />
      )}
    </div>
  );
};

export default FortuneTigerV2;
