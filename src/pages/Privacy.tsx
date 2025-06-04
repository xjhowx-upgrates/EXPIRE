import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-8 text-purple-500 hover:text-purple-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para a página inicial
        </Link>
        
        <div className="bg-gray-800 rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-500">Política de Privacidade</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. Introdução</h2>
              <p>
                Bem-vindo à Política de Privacidade da plataforma EXPIRE. Esta política descreve como coletamos, 
                usamos e protegemos suas informações quando você utiliza nosso serviço de jogos online.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. Dados Coletados</h2>
              <p>Coletamos os seguintes tipos de informações:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Informações de perfil (nome, e-mail, data de nascimento)</li>
                <li>Dados de uso e estatísticas de jogo</li>
                <li>Informações sobre dispositivo e conexão</li>
                <li>Registros de chat e interações sociais na plataforma</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. Uso dos Dados</h2>
              <p>Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Personalizar sua experiência na plataforma</li>
                <li>Melhorar nossos jogos e serviços</li>
                <li>Garantir a segurança da plataforma</li>
                <li>Enviar comunicações sobre promoções e atualizações</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. Proteção de Dados</h2>
              <p>
                Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, 
                alteração, divulgação ou destruição. Utilizamos criptografia avançada e seguimos as melhores 
                práticas do setor.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. Compartilhamento de Dados</h2>
              <p>
                Não vendemos seus dados pessoais a terceiros. Podemos compartilhar informações com provedores 
                de serviços que nos ajudam a operar a plataforma, sempre respeitando esta política de privacidade.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. Seus Direitos</h2>
              <p>Você tem o direito de:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir informações imprecisas</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Limitar o processamento de suas informações</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">7. Alterações na Política</h2>
              <p>
                Podemos atualizar esta política periodicamente. Notificaremos sobre alterações significativas 
                por e-mail ou por meio de um aviso em nosso site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">8. Contato</h2>
              <p>
                Para qualquer dúvida sobre esta política ou sobre suas informações pessoais, entre em contato 
                pelo e-mail: privacy@expire.com.br
              </p>
            </section>
          </div>
          
          <div className="mt-10 text-center text-sm text-gray-400">
            <p>Última atualização: 20 de Maio de 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
