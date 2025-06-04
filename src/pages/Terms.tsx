import { Link } from 'react-router-dom';

const Terms = () => {
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
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-500">Termos de Uso</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar ou usar a plataforma EXPIRE, você concorda em ficar vinculado a estes Termos de Uso. 
                Se você não concordar com algum aspecto destes termos, não poderá usar nossos serviços.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. Elegibilidade</h2>
              <p>
                Para usar a plataforma EXPIRE, você deve ter pelo menos 18 anos de idade. Ao criar uma conta, 
                você confirma que atende a este requisito de idade mínima e que tem capacidade legal para 
                aceitar estes termos.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. Contas de Usuário</h2>
              <p>
                Você é responsável por manter a confidencialidade de suas credenciais de login e por todas 
                as atividades que ocorrem em sua conta. Notifique-nos imediatamente sobre qualquer uso não 
                autorizado da sua conta ou qualquer outra violação de segurança.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. Moeda Virtual e Transações</h2>
              <p>
                A plataforma EXPIRE utiliza "minutos" como moeda virtual. Estes minutos:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Não têm valor monetário real</li>
                <li>Não podem ser transferidos para outros usuários</li>
                <li>Não podem ser convertidos em dinheiro real</li>
                <li>Podem ser ganhos através de atividades na plataforma ou assistindo anúncios</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. Conduta do Usuário</h2>
              <p>
                Ao usar a plataforma EXPIRE, você concorda em não:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Violar quaisquer leis aplicáveis</li>
                <li>Postar conteúdo ofensivo, ameaçador ou abusivo</li>
                <li>Tentar acessar áreas restritas da plataforma</li>
                <li>Usar bots, scripts ou outros métodos automatizados</li>
                <li>Tentar manipular os resultados dos jogos</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo da plataforma EXPIRE, incluindo jogos, designs, logos e textos, é de 
                propriedade exclusiva da EXPIRE ou de seus licenciadores e é protegido por leis de 
                propriedade intelectual.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">7. Modificações nos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entram 
                em vigor assim que publicadas na plataforma. O uso contínuo da plataforma após tais alterações 
                constitui sua aceitação dos novos termos.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">8. Limitação de Responsabilidade</h2>
              <p>
                A plataforma EXPIRE é fornecida "como está", sem garantias de qualquer tipo. Não seremos 
                responsáveis por danos diretos, indiretos, incidentais ou consequenciais resultantes do 
                uso ou da incapacidade de usar nossa plataforma.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">9. Encerramento de Conta</h2>
              <p>
                Reservamo-nos o direito de suspender ou encerrar sua conta a nosso critério, sem aviso prévio, 
                se violar estes termos ou por qualquer outro motivo.
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

export default Terms;
