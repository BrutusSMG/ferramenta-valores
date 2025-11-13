document.addEventListener('DOMContentLoaded', () => {
    // Lista de valores pré-definidos
    const initialValues = [
        { name: "Altruísmo", description: "A abnegação em prol do bem maior da sociedade. Ajudar os outros sem esperar nada em troca." },
        { name: "Confiabilidade", description: "Ser uma pessoa em quem os outros podem confiar e contar." },
        { name: "Integridade", description: "Fazer o que é certo, mesmo quando ninguém está olhando. Ser honesto e consistente." },
        { name: "Generosidade", description: "Ser generoso com seu tempo, conhecimento e bondade, não apenas com dinheiro." },
        { name: "Coragem", description: "Enfrentar seus medos e agir apesar deles para defender o que é certo." },
        { name: "Gratidão", description: "Apreciar ativamente o que você tem na vida, reconhecendo o positivo." },
        { name: "Bem-estar", description: "Cuidar da sua saúde física, mental e emocional como uma prioridade." },
        { name: "Educação", description: "A busca contínua por conhecimento e aprendizado." },
        { name: "Criatividade", description: "Usar a imaginação para criar, inovar e resolver problemas de formas novas." },
        { name: "Família", description: "Valorizar e nutrir os laços familiares e as relações próximas." },
        { name: "Autoestima", description: "Respeitar a si mesmo, conhecer seu valor e estabelecer limites saudáveis." },
        { name: "Adaptabilidade", description: "Ajustar-se a mudanças e desafios com flexibilidade e resiliência." },
        { name: "Autoaperfeiçoamento", description: "A busca constante por ser uma versão melhor de si mesmo." },
        { name: "Singularidade", description: "Prezar pela sua individualidade e não ter medo de ser diferente." },
        { name: "Assertividade", description: "Comunicar suas necessidades e opiniões de forma confiante e respeitosa." },
        { name: "Oferecer apoio", description: "Estar presente para os outros em momentos difíceis, oferecendo um ombro amigo." },
        { name: "Sustentabilidade", description: "Preocupar-se com o meio ambiente e o impacto de suas ações no planeta." },
        { name: "Mente aberta", description: "Estar receptivo a novas ideias, perspectivas e culturas." },
        { name: "Crescimento pessoal", description: "Evoluir em áreas emocionais, intelectuais e espirituais." },
        { name: "Flexibilidade", description: "Alternar entre diferentes formas de pensar e se adaptar a novas tarefas." },
        { name: "Frugalidade", description: "Ser cuidadoso e econômico com recursos, especialmente dinheiro." },
        { name: "Independência", description: "Valorizar a autossuficiência e a capacidade de fazer as coisas por si mesmo." },
        { name: "Autocompaixão", description: "Tratar a si mesmo com a mesma gentileza que trataria um amigo." },
        { name: "Honestidade", description: "Ser verdadeiro em palavras e ações, mesmo quando é difícil." },
        { name: "Responsabilidade", description: "Assumir o controle da sua situação e ser dono de seus erros e acertos." },
        { name: "Autenticidade", description: "Ser fiel a si mesmo, sem fingir ser algo que não é." },
        { name: "Lealdade", description: "Apoiar os outros nos bons e maus momentos, sendo fiel a seus compromissos." },
        { name: "Comunidade", description: "Sentir-se parte de um grupo e contribuir para um senso de pertencimento." },
        { name: "Autorreflexão", description: "Apreciar a introspecção e o pensamento profundo para se autoconhecer." },
        { name: "Ambição", description: "A motivação interna para perseguir sonhos e alcançar seu potencial." },
        { name: "Equilíbrio", description: "Encontrar harmonia entre trabalho, vida pessoal e outras áreas da vida." },
        { name: "Colaboração", description: "Trabalhar bem em equipe para criar algo maior do que a soma das partes." },
        { name: "Conexão", description: "Criar laços verdadeiros e significativos com outras pessoas." },
        { name: "Curiosidade", description: "Ter o desejo de explorar, questionar e aprender coisas novas." },
        { name: "Disciplina", description: "Manter-se firme em seus compromissos e fazer o que precisa ser feito." },
        { name: "Empoderamento", description: "Ajudar os outros (e a si mesmo) a reconhecerem sua própria força." },
        { name: "Equidade", description: "Garantir que todos recebam o que precisam para ter sucesso." },
        { name: "Perdão", description: "Deixar para trás mágoas e ressentimentos para poder seguir em frente." },
        { name: "Trabalho árduo", description: "Dedicar-se e dar o seu melhor para alcançar seus objetivos." },
        { name: "Humildade", description: "Manter os pés no chão e ser autêntico, independentemente do sucesso." },
        { name: "Inovação", description: "Pensar fora da caixa e não ter medo de criar ou tentar coisas novas." },
        { name: "Alegria", description: "Encontrar e cultivar a felicidade nas pequenas e grandes coisas da vida." },
        { name: "Justiça", description: "Defender o que é certo e lutar por um tratamento justo para todos." },
        { name: "Otimismo", description: "Manter uma perspectiva positiva e acreditar em boas possibilidades." },
        { name: "Paciência", description: "Manter a calma e confiar no processo, mesmo quando as coisas demoram." },
        { name: "Perseverança", description: "Continuar avançando com determinação, mesmo diante de obstáculos." },
        { name: "Propósito", description: "Viver com intenção, alinhado com o que realmente importa para você." },
        { name: "Respeito", description: "Tratar os outros com cuidado e consideração, valorizando suas singularidades." }
    ];

    let allValues = [...initialValues];
    let userResponses = {};

    const valuesListContainer = document.getElementById('values-list');
    const gotoStep2Btn = document.getElementById('goto-step2-btn');

    const renderValues = () => {
        valuesListContainer.innerHTML = '';
        allValues.forEach((value, index) => {
            const card = document.createElement('div');
            card.className = 'value-card';
            card.dataset.index = index;

            card.innerHTML = `
                <h3>
                    ${value.name}
                    ${value.custom ? '<button class="delete-btn" title="Remover valor">🗑️</button>' : ''}
                </h3>
                <p>${value.description || 'Valor pessoal adicionado por você.'}</p>
                <div class="slider-group">
                    <label>I</label>
                    <input type="range" min="0" max="10" value="5" class="importance-slider">
                    <span class="importance-value">5</span>
                </div>
                <div class="slider-group">
                    <label>S</label>
                    <input type="range" min="0" max="10" value="5" class="sentiment-slider">
                    <span class="sentiment-value">5</span>
                </div>
            `;
            valuesListContainer.appendChild(card);
        });
        checkAllValuesRated();
    };

    const checkAllValuesRated = () => {
        // Para simplificar, vamos habilitar o botão assim que os valores forem renderizados.
        // Uma verificação mais robusta poderia garantir que todos os sliders foram movidos.
        gotoStep2Btn.disabled = false;
    };

    valuesListContainer.addEventListener('input', (e) => {
        if (e.target.type === 'range') {
            const valueSpan = e.target.nextElementSibling;
            valueSpan.textContent = e.target.value;
        }
    });
    
    valuesListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const card = e.target.closest('.value-card');
            const index = parseInt(card.dataset.index, 10);
            allValues.splice(index, 1);
            renderValues();
        }
    });

    document.getElementById('add-custom-value-btn').addEventListener('click', () => {
        const customValueNameInput = document.getElementById('custom-value-name');
        const name = customValueNameInput.value.trim();
        if (name) {
            allValues.push({ name, description: '', custom: true });
            customValueNameInput.value = '';
            renderValues();
            // Rola para o final para ver o novo valor
            valuesListContainer.lastChild.scrollIntoView({ behavior: 'smooth' });
        }
    });

    gotoStep2Btn.addEventListener('click', () => {
        // 1. Coletar e calcular scores
        userResponses.values = allValues.map((value, index) => {
            const card = document.querySelector(`.value-card[data-index="${index}"]`);
            const importance = parseInt(card.querySelector('.importance-slider').value, 10);
            const sentiment = parseInt(card.querySelector('.sentiment-slider').value, 10);
            return {
                name: value.name,
                importance,
                sentiment,
                total: importance + sentiment
            };
        });

        // 2. Ordenar e pegar o Top 5
        userResponses.top5 = [...userResponses.values].sort((a, b) => b.total - a.total).slice(0, 5);

        // 3. Renderizar Etapa 2
        const top5MeaningContainer = document.getElementById('top5-meaning-list');
        top5MeaningContainer.innerHTML = '';
        userResponses.top5.forEach((value, index) => {
            top5MeaningContainer.innerHTML += `
                <div class="top-value-card">
                    <h3>${index + 1}. ${value.name}</h3>
                    <label for="meaning-${index}">O que '${value.name}' significa para você?</label>
                    <textarea id="meaning-${index}" rows="3"></textarea>
                </div>
            `;
        });

        // 4. Mudar de tela
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
        window.scrollTo(0, 0);
    });

    document.getElementById('goto-step3-btn').addEventListener('click', () => {
        // 1. Coletar significados
        userResponses.top5.forEach((value, index) => {
            value.meaning = document.getElementById(`meaning-${index}`).value;
        });

        // 2. Renderizar Etapa 3
        const top5TriggersContainer = document.getElementById('top5-triggers-list');
        top5TriggersContainer.innerHTML = '';
        userResponses.top5.forEach((value, index) => {
            top5TriggersContainer.innerHTML += `
                <div class="top-value-card">
                    <h3>${index + 1}. ${value.name}</h3>
                    <label for="motivator-${index}">Quais comportamentos/situações REFORÇAM este valor?</label>
                    <textarea id="motivator-${index}" rows="3"></textarea>
                    <label for="saboteur-${index}">Quais comportamentos/situações ENFRAQUECEM este valor?</label>
                    <textarea id="saboteur-${index}" rows="3"></textarea>
                </div>
            `;
        });

        // 3. Mudar de tela
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
        window.scrollTo(0, 0);
    });

    document.getElementById('finish-btn').addEventListener('click', () => {
        // 1. Coletar motivadores e sabotadores
        userResponses.top5.forEach((value, index) => {
            value.motivator = document.getElementById(`motivator-${index}`).value;
            value.saboteur = document.getElementById(`saboteur-${index}`).value;
        });

        // 2. Renderizar Relatório Final
        const finalReportContainer = document.getElementById('final-report');
        finalReportContainer.innerHTML = '<h2>Sua Hierarquia de Valores</h2>';
        userResponses.top5.forEach((value, index) => {
            finalReportContainer.innerHTML += `
                <div class="report-section">
                    <h3>${index + 1}. ${value.name} (Score Total: ${value.total})</h3>
                    <p><strong>O que significa para você:</strong> ${value.meaning || 'Não preenchido.'}</p>
                    <p><strong>O que reforça (Motivadores):</strong> ${value.motivator || 'Não preenchido.'}</p>
                    <p><strong>O que enfraquece (Sabotadores):</strong> ${value.saboteur || 'Não preenchido.'}</p>
                </div>
            `;
        });
        
        // 3. Mudar de tela
        document.getElementById('step3').classList.remove('active');
        document.getElementById('step4').classList.add('active');
        window.scrollTo(0, 0);
    });
    
    document.getElementById('send-report-btn').addEventListener('click', () => {
        // Lógica para enviar o relatório.
        // Por enquanto, apenas um alerta.
        // Aqui você integraria com sua automação (ex: enviar dados para uma Planilha Google).
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        if(name && email) {
            alert(`Relatório para ${name} (${email}) seria enviado aqui!`);
            // Você pode usar JSON.stringify(userResponses) para obter todos os dados.
            console.log(JSON.stringify(userResponses, null, 2));
        } else {
            alert('Por favor, preencha seu nome e e-mail.');
        }
    });

    // Iniciar a aplicação
    renderValues();
});
