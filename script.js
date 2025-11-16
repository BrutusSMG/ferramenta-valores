document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // === LÓGICA PARA O BOTÃO DE AJUDA FLUTUANTE          ===
    // =======================================================
    const helpBtn = document.getElementById('floating-help-btn');
    const instructionsBox = document.querySelector('#step1 .instructions-box');

    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) {
            helpBtn.classList.add('visible');
        } else {
            helpBtn.classList.remove('visible');
        }
    });

    if (instructionsBox) {
        observer.observe(instructionsBox);
    }

    // ------------------------------------------------------------------
    // --- 1. DICIONÁRIOS DE DADOS E VARIÁVEIS GLOBAIS
    // ------------------------------------------------------------------

    const valueScenarios = {
        "Altruísmo": "Você está voltando pra casa cansado e vê uma senhora tentando carregar compras pesadas.", "Confiabilidade": "Um colega te entrega uma tarefa importante porque “sabe que você entrega”.", "Integridade": "Você encontra um valor cobrado a menos na conta e decide avisar ao atendente.", "Generosidade": "Você percebe que seu amigo está passando por dificuldades e oferece ajudar sem ele pedir.", "Coragem": "Você precisa ter uma conversa difícil com alguém que ama.", "Gratidão": "Alguém faz algo simples por você — e você para, reconhece e agradece de verdade.", "Bem-estar": "Você decide dormir mais cedo em vez de maratonar uma série.", "Educação": "Mesmo irritado, você mantém a postura ao ser mal atendido.", "Criatividade": "Você encontra uma solução inesperada para um problema no trabalho.", "Família": "Você abre mão de um compromisso para estar presente em um momento importante de alguém da família.", "Autoestima": "Você recebe um elogio e, ao invés de negar, você aceita com tranquilidade.", "Adaptabilidade": "Seu plano do dia muda de última hora e você ajusta tudo sem surtar.", "Autoaperfeiçoamento": "Você escolhe estudar 20 minutos por dia para melhorar sua carreira.", "Singularidade": "Você mantém seu estilo ou opinião mesmo quando a maioria faz diferente.", "Assertividade": "Você diz “não” para algo que não cabe na sua agenda.", "Oferecer apoio": "Um amigo te liga abatido e você para o que está fazendo para ouvi-lo.", "Sustentabilidade": "Você decide comprar produtos reutilizáveis no dia a dia.", "Mente aberta": "Você escuta uma opinião contrária à sua sem julgar e tenta entender.", "Crescimento pessoal": "Você assume uma nova responsabilidade para se desafiar.", "Flexibilidade": "O restaurante que você queria está fechado e você escolhe outro sem frustração.", "Frugalidade": "Você opta por cozinhar em casa em vez de pedir delivery para economizar.", "Independência": "Você decide resolver um problema sozinho para não depender de ninguém.", "Autocompaixão": "Você erra e ao invés de se atacar, respira fundo e se perdoa.", "Honestidade": "Você admite que cometeu um erro antes que alguém perceba.", "Responsabilidade": "Você cumpre prazos mesmo quando está sem vontade.", "Autenticidade": "Você mostra quem realmente é, sem tentar agradar todo mundo.", "Lealdade": "Você defende um amigo quando ele não está por perto.", "Comunidade": "Você participa de uma ação voluntária no seu bairro.", "Autorreflexão": "Antes de reagir, você para e se pergunta: “por que isso me incomodou tanto?”", "Ambição": "Você coloca uma meta ousada para sua carreira e começa a agir.", "Equilíbrio": "Você divide o dia entre trabalho, descanso e lazer de forma saudável.", "Colaboração": "Você se junta ao time para resolver algo que sozinho seria mais demorado.", "Conexão": "Você dedica tempo real — sem celular — para conversar com alguém especial.", "Curiosidade": "Você pesquisa sobre algo novo só porque te intrigou.", "Disciplina": "Mesmo sem motivação, você cumpre sua rotina.", "Empoderamento": "Você toma decisões que normalmente delegaria a outras pessoas.", "Equidade": "Você garante que todos tenham as mesmas oportunidades num projeto.", "Perdão": "Você escolhe deixar para trás uma mágoa antiga.", "Humildade": "Você reconhece quando não sabe algo e pede ajuda.", "Inovação": "Você implementa um método novo para melhorar seu trabalho.", "Alegria": "Você se permite fazer algo só pelo prazer do momento.", "Justiça": "Você defende o que é certo mesmo quando isso traz desconforto.", "Otimismo": "Mesmo diante de dificuldades, você consegue enxergar possibilidades.", "Paciência": "Você espera calmamente enquanto resolve um problema burocrático.", "Perseverança": "Mesmo depois de falhar, você tenta de novo.", "Propósito": "Você escolhe um projeto que faz sentido para sua missão de vida.", "Respeito": "Você escuta alguém até o fim mesmo discordando totalmente."
    };
    const initialValues = [
        { name: "Altruísmo", description: "A abnegação em prol do bem maior da sociedade. Ajudar os outros sem esperar nada em troca." }, { name: "Confiabilidade", description: "Ser uma pessoa em quem os outros podem confiar e contar." }, { name: "Integridade", description: "Fazer o que é certo, mesmo quando ninguém está olhando. Ser honesto e consistente." }, { name: "Generosidade", description: "Ser generoso com seu tempo, conhecimento e bondade, não apenas com dinheiro." }, { name: "Coragem", description: "Enfrentar seus medos e agir apesar deles para defender o que é certo." }, { name: "Gratidão", description: "Apreciar ativamente o que você tem na vida, reconhecendo o positivo." }, { name: "Bem-estar", description: "Cuidar da sua saúde física, mental e emocional como uma prioridade." }, { name: "Educação", description: "A busca contínua por conhecimento e aprendizado." }, { name: "Criatividade", description: "Usar a imaginação para criar, inovar e resolver problemas de formas novas." }, { name: "Família", description: "Valorizar e nutrir os laços familiares e as relações próximas." }, { name: "Autoestima", description: "Respeitar a si mesmo, conhecer seu valor e estabelecer limites saudáveis." }, { name: "Adaptabilidade", description: "Ajustar-se a mudanças e desafios com flexibilidade e resiliência." }, { name: "Autoaperfeiçoamento", description: "A busca constante por ser uma versão melhor de si mesmo." }, { name: "Singularidade", description: "Prezar pela sua individualidade e não ter medo de ser diferente." }, { name: "Assertividade", description: "Comunicar suas necessidades e opiniões de forma confiante e respeitosa." }, { name: "Oferecer apoio", description: "Estar presente para os outros em momentos difíceis, oferecendo um ombro amigo." }, { name: "Sustentabilidade", description: "Preocupar-se com o meio ambiente e o impacto de suas ações no planeta." }, { name: "Mente aberta", description: "Estar receptivo a novas ideias, perspectivas e culturas." }, { name: "Crescimento pessoal", description: "Evoluir em áreas emocionais, intelectuais e espirituais." }, { name: "Flexibilidade", description: "Alternar entre diferentes formas de pensar e se adaptar a novas tarefas." }, { name: "Frugalidade", description: "Ser cuidadoso e econômico com recursos, especialmente dinheiro." }, { name: "Independência", description: "Valorizar a autossuficiência e a capacidade de fazer as coisas por si mesmo." }, { name: "Autocompaixão", description: "Tratar a si mesmo com a mesma gentileza que trataria um amigo." }, { name: "Honestidade", description: "Ser verdadeiro em palavras e ações, mesmo quando é difícil." }, { name: "Responsabilidade", description: "Assumir o controle da sua situação e ser dono de seus erros e acertos." }, { name: "Autenticidade", description: "Ser fiel a si mesmo, sem fingir ser algo que não é." }, { name: "Lealdade", description: "Apoiar os outros nos bons e maus momentos, sendo fiel a seus compromissos." }, { name: "Comunidade", description: "Sentir-se parte de um grupo e contribuir para um senso de pertencimento." }, { name: "Autorreflexão", description: "Apreciar a introspecção e o pensamento profundo para se autoconhecer." }, { name: "Ambição", description: "A motivação interna para perseguir sonhos e alcançar seu potencial." }, { name: "Equilíbrio", description: "Encontrar harmonia entre trabalho, vida pessoal e outras áreas da vida." }, { name: "Colaboração", description: "Trabalhar bem em equipe para criar algo maior do que a soma das partes." }, { name: "Conexão", description: "Criar laços verdadeiros e significativos com outras pessoas." }, { name: "Curiosidade", description: "Ter o desejo de explorar, questionar e aprender coisas novas." }, { name: "Disciplina", description: "Manter-se firme em seus compromissos e fazer o que precisa ser feito." }, { name: "Empoderamento", description: "Ajudar os outros (e a si mesmo) a reconhecerem sua própria força." }, { name: "Equidade", description: "Garantir que todos recebam o que precisam para ter sucesso." }, { name: "Perdão", description: "Deixar para trás mágoas e ressentimentos para poder seguir em frente." }, { name: "Trabalho árduo", description: "Dedicar-se e dar o seu melhor para alcançar seus objetivos." }, { name: "Humildade", description: "Manter os pés no chão e ser autêntico, independentemente do sucesso." }, { name: "Inovação", description: "Pensar fora da caixa e não ter medo de criar ou tentar coisas novas." }, { name: "Alegria", description: "Encontrar e cultivar a felicidade nas pequenas e grandes coisas da vida." }, { name: "Justiça", description: "Defender o que é certo e lutar por um tratamento justo para todos." }, { name: "Otimismo", description: "Manter uma perspectiva positiva e acreditar em boas possibilidades." }, { name: "Paciência", description: "Manter a calma e confiar no processo, mesmo quando as coisas demoram." }, { name: "Perseverança", description: "Continuar avançando com determinação, mesmo diante de obstáculos." }, { name: "Propósito", description: "Viver com intenção, alinhado com o que realmente importa para você." }, { name: "Respeito", description: "Tratar os outros com cuidado e consideração, valorizando suas singularidades." }
    ];

    let allValues = [...initialValues];
    let userResponses = {};
    let confrontationPairs = [];
    let currentConfrontationIndex = 0;

    const valuesListContainer = document.getElementById('values-list');
    const gotoStep2Btn = document.getElementById('goto-step2-btn');
    const introCard = document.getElementById('intro-card');

    // ------------------------------------------------------------------
    // --- 2. FUNÇÕES DE RENDERIZAÇÃO
    // ------------------------------------------------------------------

    // ==================================================================
    // === FUNÇÃO PARA RESETAR A APLICAÇÃO PARA O ESTADO INICIAL    ===
    // ==================================================================
    function resetApp() {
    	// 1. Limpa o objeto de respostas do usuário
    	userResponses = {};
    	confrontationPairs = [];
    	currentConfrontationIndex = 0;

    	// 2. Esconde todas as etapas e mostra apenas a Etapa 1
    	document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    	document.getElementById('step1').classList.add('active');

    	// 3. Reexibe o card de introdução
    	document.getElementById('intro-card').style.display = 'block';

    	// 4. Limpa os campos de nome e e-mail da Etapa 5
    	document.getElementById('user-name').value = '';
	document.getElementById('user-email').value = '';
	
    	// 5. Restaura o botão de envio da Etapa 5
    	const sendButton = document.getElementById('send-report-btn');
    	sendButton.disabled = false;
    	sendButton.textContent = 'Enviar Relatório por E-mail';
    
    	// 6. Restaura o botão da Etapa 4 para o estado desabilitado
    	document.getElementById('goto-step5-btn').disabled = true;

    	// 7. Renderiza os valores da Etapa 1 para resetar os sliders
    	renderValues();

    	// 8. Rola a página para o topo
    	window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    const renderValues = () => {
        valuesListContainer.innerHTML = '';
        allValues.forEach((value, index) => {
            const card = document.createElement('div');
            card.className = 'value-card';
            card.dataset.index = index;
            card.innerHTML = `
                <h3>
                    ${value.name}
                    ${value.custom ? `<button class="delete-btn" title="Remover valor">🗑️</button>` : ''}
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
    };

    const renderStep2 = () => {
        const top5MeaningContainer = document.getElementById('top5-meaning-list');
        const existingMeanings = {};
        if (userResponses.top5) {
            userResponses.top5.forEach((value, index) => {
                const textarea = document.getElementById(`meaning-${index}`);
                if (textarea) existingMeanings[value.name] = textarea.value;
            });
        }
        top5MeaningContainer.innerHTML = '';
        userResponses.top5.forEach((value, index) => {
            top5MeaningContainer.innerHTML += `
                <div class="top-value-card" data-value-name="${value.name}">
                    <h3>${index + 1}. ${value.name} <span class="score-display">(Pontuação: ${value.total})</span></h3>
                    <label for="meaning-${index}">O que '${value.name}' significa para você?</label>
                    <textarea id="meaning-${index}" rows="3">${existingMeanings[value.name] || ''}</textarea>
                    <button class="swap-btn" data-index="${index}">Trocar este Valor</button>
                </div>
            `;
        });
    };

    const renderConfrontation = () => {
        const confrontationArea = document.getElementById('confrontation-area');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');

        if (currentConfrontationIndex >= confrontationPairs.length) {
            confrontationArea.innerHTML = '<p style="text-align: center; font-size: 18px;">Prova de Fogo finalizada!</p>';
            document.getElementById('goto-step5-btn').disabled = false;
            progressText.textContent = `Confrontos concluídos!`;
            progressBar.style.width = `100%`;
            return;
        }

        const pair = confrontationPairs[currentConfrontationIndex];
        const value1 = pair[0];
        const value2 = pair[1];

        const scenario1 = valueScenarios[value1.name] || `Imagine-se em um cenário onde se exige o valor "${value1.name}".`;
	const scenario2 = valueScenarios[value2.name] || `Imagine-se em um cenário onde se exige o valor "${value2.name}".`;

        confrontationArea.innerHTML = `
            <div class="confrontation-card">
                <button class="choice-btn" data-winner="${value1.name}">
                    <div class="choice-title">${value1.name}</div>
                    <div class="choice-scenario">${scenario1}</div>
                </button>
                <span>ou</span>
                <button class="choice-btn" data-winner="${value2.name}">
                    <div class="choice-title">${value2.name}</div>
                    <div class="choice-scenario">${scenario2}</div>
                </button>
            </div>
        `;

        const progress = ((currentConfrontationIndex) / confrontationPairs.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Confronto ${currentConfrontationIndex + 1} de ${confrontationPairs.length}`;
    };

    // ------------------------------------------------------------------
    // --- 3. LÓGICA DE EVENTOS E NAVEGAÇÃO
    // ------------------------------------------------------------------

    valuesListContainer.addEventListener('input', (e) => {
        if (e.target.type === 'range') e.target.nextElementSibling.textContent = e.target.value;
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
        const input = document.getElementById('custom-value-name');
        const name = input.value.trim();
        if (name && !allValues.some(v => v.name.toLowerCase() === name.toLowerCase())) {
            allValues.push({ name, description: 'Valor pessoal adicionado por você.', custom: true });
            input.value = '';
            renderValues();
            valuesListContainer.lastChild.scrollIntoView({ behavior: 'smooth' });
        }
    });

    gotoStep2Btn.addEventListener('click', () => {
        userResponses.values = allValues.map((value, index) => {
            const card = document.querySelector(`.value-card[data-index="${index}"]`);
            const importance = parseInt(card.querySelector('.importance-slider').value, 10);
            const sentiment = parseInt(card.querySelector('.sentiment-slider').value, 10);
            return { ...value, importance, sentiment, total: importance + sentiment };
        });
        userResponses.top5 = [...userResponses.values].sort((a, b) => b.total - a.total).slice(0, 5);
        renderStep2();
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
        introCard.style.display = 'none';
        window.scrollTo(0, 0);
    });

    document.getElementById('goto-step3-btn').addEventListener('click', () => {
        userResponses.top5.forEach((value, index) => {
            value.meaning = document.getElementById(`meaning-${index}`).value;
        });
        const container = document.getElementById('top5-triggers-list');
        container.innerHTML = '';
        userResponses.top5.forEach((value, index) => {
            container.innerHTML += `
                <div class="top-value-card">
                    <h3>${index + 1}. ${value.name}</h3>
                    <label for="motivator-${index}"><b>Motivador:</b> Como ter o valor '${value.name}' te ajuda a avançar rumo à realização do seu objetivo?</label>
                    <textarea id="motivator-${index}" rows="3" placeholder="Ex: Minha 'Honestidade' me ajuda a construir confiança..."></textarea>
                    <label for="saboteur-${index}"><b>Sabotador:</b> Como ter o valor '${value.name}' te atrapalha a realizar seu objetivo?</label>
                    <textarea id="saboteur-${index}" rows="3" placeholder="Ex: Minha 'Honestidade' excessiva me faz criar conflitos..."></textarea>
                </div>
            `;
        });
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
        window.scrollTo(0, 0);
    });

    document.getElementById('goto-step4-btn').addEventListener('click', () => {
        userResponses.top5.forEach((value, index) => {
            value.motivator = document.getElementById(`motivator-${index}`).value;
            value.saboteur = document.getElementById(`saboteur-${index}`).value;
            value.wins = 0;
        });
        confrontationPairs = [];
        for (let i = 0; i < userResponses.top5.length; i++) {
            for (let j = i + 1; j < userResponses.top5.length; j++) {
                confrontationPairs.push([userResponses.top5[i], userResponses.top5[j]]);
            }
        }
        currentConfrontationIndex = 0;
        renderConfrontation();
        document.getElementById('step3').classList.remove('active');
        document.getElementById('step4').classList.add('active');
        window.scrollTo(0, 0);
    });

    document.getElementById('confrontation-area').addEventListener('click', (e) => {
        const choiceButton = e.target.closest('.choice-btn');
        if (choiceButton) {
            const winnerName = choiceButton.dataset.winner;
            const winnerValue = userResponses.top5.find(v => v.name === winnerName);
            if (winnerValue) winnerValue.wins++;
            currentConfrontationIndex++;
            renderConfrontation();
        }
    });

    document.getElementById('goto-step5-btn').addEventListener('click', () => {
        userResponses.top5.sort((a, b) => {
            if (b.wins !== a.wins) return b.wins - a.wins;
            return b.total - a.total;
        });
        const finalReportContainer = document.getElementById('final-report');
        finalReportContainer.innerHTML = '<h2>Sua Hierarquia de Valores Definitiva</h2>';
        userResponses.top5.forEach((value, index) => {
            finalReportContainer.innerHTML += `
                <div class="report-section">
                    <h3>${index + 1}. ${value.name} <span class="score-display">(Pontuação: ${value.total} | Vitórias: ${value.wins})</span></h3>
                    <p><strong>O que significa para você:</strong> ${value.meaning || 'Não preenchido.'}</p>
                    <p><strong>Como ele te ajuda (Motivador):</strong> ${value.motivator || 'Não preenchido.'}</p>
                    <p><strong>Como ele te atrapalha (Sabotador):</strong> ${value.saboteur || 'Não preenchido.'}</p>
                </div>
            `;
        });
        document.getElementById('step4').classList.remove('active');
        document.getElementById('step5').classList.add('active');
        window.scrollTo(0, 0);
    });

	// ==================================================================
	// === BLOCO DE ENVIO FINAL - COM BARRA DE PROGRESSO E MODAL      ===
	// ==================================================================
	document.getElementById('send-report-btn').addEventListener('click', (e) => {
		const sendButton = e.target;
		const name = document.getElementById('user-name').value;
		const email = document.getElementById('user-email').value;

		if (!name || !email) {
			alert('Por favor, preencha seu nome e e-mail.');
			return;
		}

		userResponses.name = name;
		userResponses.email = email;

		// 1. Mostra a barra de progresso e desativa o botão
		const progressOverlay = document.getElementById('progress-overlay');
		progressOverlay.style.display = 'flex';
		sendButton.disabled = true;
		sendButton.textContent = 'Enviando...';

		const webAppUrl = 'https://script.google.com/macros/s/AKfycbwaYCgNj_P1mVREkedsYEZM0auqjvDBKAQllqyX68t1Y2cYzFxKBRsZ3edKXgOrMryP/exec'; // Sua URL aqui

		const formData = new FormData( );
		formData.append('jsonData', JSON.stringify(userResponses));

		fetch(webAppUrl, {
			method: 'POST',
			body: formData,
		})
		.then(response => response.json())
		.then(data => {
			// 2. Esconde a barra de progresso
			progressOverlay.style.display = 'none';

			if (data.status === 'success') {
				// 3. Mostra o modal de sucesso
				document.getElementById('success-modal').style.display = 'flex';
			} else {
				// Se der erro, mostra um alerta e reativa o botão
				console.error('Erro retornado pelo servidor:', data.message);
				alert('Ocorreu um erro no servidor ao processar seu relatório. A equipe já foi notificada.');
				sendButton.disabled = false;
				sendButton.textContent = 'Enviar Relatório por E-mail';
			}
		})
		.catch(error => {
			// Se der erro de rede, esconde a barra, mostra alerta e reativa o botão
			progressOverlay.style.display = 'none';
			console.error('Erro de rede ao tentar enviar dados:', error);
			alert('Ocorreu um erro de rede ao enviar seu relatório. Por favor, tente novamente.');
			sendButton.disabled = false;
			sendButton.textContent = 'Enviar Relatório por E-mail';
		});
	});

	// Adiciona o listener para o botão "OK" do modal de sucesso
	document.getElementById('success-ok-btn').addEventListener('click', () => {
		// Esconde o modal e reseta a aplicação
		document.getElementById('success-modal').style.display = 'none';
		resetApp();
	});


    // --- BLOCO DO MODAL FINAL E CORRIGIDO ---
    const swapModal = document.getElementById('swap-modal');
    const top5MeaningContainer = document.getElementById('top5-meaning-list');
    const valueToReplaceEl = document.getElementById('value-to-replace');
    const replacementList = document.getElementById('replacement-list');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    let currentIndexToSwap = -1;

    top5MeaningContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('swap-btn')) {
            currentIndexToSwap = parseInt(e.target.dataset.index, 10);
            const valueToSwap = userResponses.top5[currentIndexToSwap];
            valueToReplaceEl.textContent = `"${valueToSwap.name}"`;
            const otherValues = userResponses.values.filter(v => !userResponses.top5.some(topV => topV.name === v.name)).sort((a, b) => b.total - a.total);
            replacementList.innerHTML = '';
            otherValues.forEach(value => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${value.name}</span> <b>Pontuação: ${value.total}</b>`;
                li.dataset.valueName = value.name;
                replacementList.appendChild(li);
            });
            swapModal.style.display = 'flex';
        }
    });

    replacementList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (li) {
            const newValueName = li.dataset.valueName;
            const newValue = userResponses.values.find(v => v.name === newValueName);
            if (newValue) {
                userResponses.top5[currentIndexToSwap] = newValue;
                renderStep2();
                swapModal.style.display = 'none';
            }
        }
    });

    modalCloseBtn.addEventListener('click', () => swapModal.style.display = 'none');
    swapModal.addEventListener('click', (e) => {
        if (e.target === swapModal) swapModal.style.display = 'none';
    });

    // ------------------------------------------------------------------
    // --- 4. INICIALIZAÇÃO DA APLICAÇÃO
    // ------------------------------------------------------------------
    renderValues();
});
