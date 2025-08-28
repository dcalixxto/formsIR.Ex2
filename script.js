document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
  
    // atalhos
    const get = id => document.getElementById(id);
    const fb = id => document.getElementById('fb-' + id);
  
    // Regex
    const RE_CPF   = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const RE_LOGIN = /^[A-Za-z0-9._-]{4,}$/;
    const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const RE_SENHA = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  
    // Funções de feedback visual
    function markValid(el){ el.classList.add('is-valid'); el.classList.remove('is-invalid'); }
    function markInvalid(el){ el.classList.add('is-invalid'); el.classList.remove('is-valid'); }
    function clearMark(el){ el.classList.remove('is-valid'); el.classList.remove('is-invalid'); }
  
    // Validações
    function validarNome(){
      const el = get('nome');
      if(el.value.trim().length < 3){ fb('nome').textContent = 'Nome deve ter pelo menos 3 caracteres.'; markInvalid(el); return false; }
      fb('nome').textContent = ''; markValid(el); return true;
    }
  
    function validarCPF(){
      const el = get('cpf');
      if(!RE_CPF.test(el.value)){ fb('cpf').textContent = 'Formato esperado: 000.000.000-00.'; markInvalid(el); return false; }
      fb('cpf').textContent = ''; markValid(el); return true;
    }
  
    function validarLogin(){
      const el = get('login');
      if(!RE_LOGIN.test(el.value)){ fb('login').textContent = 'Mínimo 4 caracteres, apenas letras, números, . _ -'; markInvalid(el); return false; }
      fb('login').textContent = ''; markValid(el); return true;
    }
  
    function validarEmail(){
      const el = get('email');
      if(!RE_EMAIL.test(el.value)){ fb('email').textContent = 'E-mail inválido.'; markInvalid(el); return false; }
      fb('email').textContent = ''; markValid(el); return true;
    }
  
    function validarSenha(){
      const el = get('senha');
      if(!RE_SENHA.test(el.value)){ fb('senha').textContent = 'Mín. 8 caracteres, 1 letra e 1 número.'; markInvalid(el); return false; }
      fb('senha').textContent = ''; markValid(el); return true;
    }
  
    function validarConfSenha(){
      const el = get('confSenha');
      if(el.value !== get('senha').value){ fb('confSenha').textContent = 'As senhas não coincidem.'; markInvalid(el); return false; }
      fb('confSenha').textContent = ''; markValid(el); return true;
    }
  
    function validarSalario(){
      const el = get('salario');
      if(parseFloat(el.value) <= 0 || isNaN(el.value)){ fb('salario').textContent = 'Informe um valor maior que zero.'; markInvalid(el); return false; }
      fb('salario').textContent = ''; markValid(el); return true;
    }
  
    function validarDependentes(){
      const el = get('dependentes');
      if(el.value === '' || Number(el.value) < 0 || !Number.isInteger(Number(el.value))){ fb('dependentes').textContent = 'Informe um inteiro ≥ 0.'; markInvalid(el); return false; }
      fb('dependentes').textContent = ''; markValid(el); return true;
    }
  
    // Cálculo IR (tabela oficial simplificada)
    function calcularIR(){
      const salario = parseFloat(get('salario').value) || 0;
      const dep = parseInt(get('dependentes').value) || 0;
      let base = salario - (200 * dep);
      if(base < 0) base = 0;
  
      let aliquota = 0;
      if(base <= 2000) aliquota = 0;
      else if(base <= 3000) aliquota = 0.075;
      else if(base <= 4500) aliquota = 0.15;
      else if(base <= 6000) aliquota = 0.225;
      else aliquota = 0.275;
  
      const ir = (base * aliquota).toFixed(2);
      get('ir').value = ir.replace('.', ',');
    }
  
    // Eventos blur
    get('nome').addEventListener('blur', validarNome);
    get('cpf').addEventListener('blur', validarCPF);
    get('login').addEventListener('blur', validarLogin);
    get('email').addEventListener('blur', validarEmail);
    get('senha').addEventListener('blur', validarSenha);
    get('confSenha').addEventListener('blur', validarConfSenha);
    get('salario').addEventListener('blur', validarSalario);
    get('dependentes').addEventListener('blur', () => {
      if(validarDependentes() && validarSalario()) calcularIR();
      else get('ir').value = "0,00";
    });
  
    // Olhinho senha
    document.querySelectorAll('.toggle-pass').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = get(btn.dataset.target);
        target.type = target.type === 'password' ? 'text' : 'password';
      });
    });
  
    // Limpar
    get('btnLimpar').addEventListener('click', () => {
      form.reset();
      get('ir').value = "0,00";
      ['nome','cpf','login','email','senha','confSenha','salario','dependentes'].forEach(id => {
        clearMark(get(id));
        fb(id).textContent = '';
      });
      get('resultado').style.display = 'none';
    });
  
    // Submissão
    form.addEventListener('submit', e => {
      e.preventDefault();
      const checks = [
        validarNome(), validarCPF(), validarLogin(), validarEmail(),
        validarSenha(), validarConfSenha(), validarSalario(), validarDependentes()
      ];
      if(checks.every(Boolean)){
        calcularIR();
        get('resultado').style.display = 'block';
        get('resultado').textContent = "Usuário cadastrado com sucesso!";
        setTimeout(() => get('btnLimpar').click(), 1500);
      } else {
        const ordem = ['nome','cpf','login','email','senha','confSenha','salario','dependentes'];
        for(const id of ordem){
          if(get(id).classList.contains('is-invalid')){ get(id).focus(); break; }
        }
      }
    });
  });  