/**
 * pages/professor/Perfil.jsx
 * Substitui perfil.html + scripts/perfil.js (professor).
 * Chamadas de API centralizadas em services/perfilService.js (o mesmo
 * service usado por pages/aluno/Perfil.jsx — endpoint idêntico).
 */
import { useEffect, useState } from 'react';
import { BASE_URL_STATIC } from '../../services/api';
import { PerfilService } from '../../services/perfilService';
import { useLogout } from '../../hooks/useLogout';
import '../../styles/professor/perfil.css';
import fotoPerfil from '../../assets/imagens/ft-perfil.png'
import pencil from '../../assets/icons/pencil.svg'

export default function Perfil() {
  const logout = useLogout();
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [perfil, setPerfil] = useState({ nomeUser: '', emailUser: '', telefone: '', curso: '' });
  const [form, setForm] = useState({
    nomeUser: '',
    emailUser: '',
    telefone: '',
    novaSenha: '',
    confirmarSenha: '',
  });
  const [foto, setFoto] = useState(localStorage.getItem('foto') || '');

  useEffect(() => {
    carregarPerfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function carregarPerfil() {
    setCarregando(true);
    try {
      const api = await PerfilService.carregar(
        localStorage.getItem('emailUser'),
        localStorage.getItem('tipoUsuario')
      );
      if (!api) return;

      const dados = {
        nomeUser: api.nome || '',
        emailUser: api.email || '',
        telefone: api.telefone || '',
        curso: api.nomeCurso || '',
      };
      setPerfil(dados);
      localStorage.setItem('nomeUser', dados.nomeUser);
      localStorage.setItem('emailUser', dados.emailUser);
      localStorage.setItem('telefone', dados.telefone);
      localStorage.setItem('curso', dados.curso);

      if (api.foto) {
        localStorage.setItem('foto', api.foto);
        setFoto(api.foto);
      }
    } catch (e) {
      console.error('Erro ao carregar perfil:', e);
    } finally {
      setCarregando(false);
    }
  }

  const iniciarEdicao = () => {
    setForm({
      nomeUser: perfil.nomeUser,
      emailUser: perfil.emailUser,
      telefone: perfil.telefone,
      novaSenha: '',
      confirmarSenha: '',
    });
    setEditando(true);
  };

  const salvar = async () => {
    if (form.novaSenha && form.novaSenha !== form.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const dados = {
      emailUser: localStorage.getItem('emailUser'),
      tipoUser: localStorage.getItem('tipoUsuario'),
      nome: form.nomeUser,
      email: form.emailUser,
      telefone: form.telefone,
    };
    if (form.novaSenha) dados.senha = form.novaSenha;

    try {
      const res = await PerfilService.atualizar(dados);
      if (res?.status === 'success') {
        localStorage.setItem('nomeUser', dados.nome);
        localStorage.setItem('emailUser', dados.email);
        localStorage.setItem('telefone', dados.telefone);
        setPerfil((prev) => ({
          ...prev,
          nomeUser: dados.nome,
          emailUser: dados.email,
          telefone: dados.telefone,
        }));
        setEditando(false);
      } else {
        alert(res?.message || 'Erro ao salvar.');
      }
    } catch (e) {
      console.error('Erro ao salvar perfil:', e);
      alert('Erro ao salvar.');
    }
  };

  const handleFoto = async (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const ext = arquivo.name.split('.').pop().toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(ext)) {
      alert('Apenas arquivos JPG e PNG são permitidos.');
      return;
    }

    const formData = new FormData();
    formData.append('foto', arquivo);
    formData.append('emailUser', localStorage.getItem('emailUser'));
    formData.append('tipoUser', localStorage.getItem('tipoUsuario'));

    try {
      const data = await PerfilService.uploadFoto(formData);
      if (data?.status === 'sucesso') {
        localStorage.setItem('foto', data.foto);
        setFoto(data.foto);
      } else {
        alert(data?.mensagem || 'Erro ao atualizar foto.');
      }
    } catch (err) {
      console.error('Erro ao enviar foto:', err);
      alert('Erro ao atualizar foto.');
    }
  };

  const fotoSrc = foto ? `${BASE_URL_STATIC}/storage/${foto}?t=${Date.now()}` : {fotoPerfil};

  return (
    <div className="content slim cl">
      <div className="container cl">
        <div className="topC rw jc-sb al-fs">
          <div style={{ position: 'relative', width: 100, height: 100 }}>
            <img
              src={fotoPerfil}
              alt="foto de perfil"
              className="ft-perfil"
              style={{ cursor: 'pointer' }}
              onClick={() => document.getElementById('input-foto').click()}
            />
            <input
              type="file"
              id="input-foto"
              accept=".jpg,.jpeg,.png"
              style={{ display: 'none' }}
              onChange={handleFoto}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: 'var(--cinza-paleta)',
                borderRadius: '50%',
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <img className="icon pencil" style={{ width: 18, height: 18, backgroundSize: '80%' }} src={pencil}  alt="" />

            </div>
          </div>

          <div className="cl">
            <p>Curso :</p>
            <p id="curso">{perfil.curso} GTI</p>
          </div>

          <button id="logout" className="btn-V fc" onClick={logout}>
            <span className="icon logout"></span>
            
            <p className="fs18">Sair</p>
          </button>
        </div>

        <div className="info-perfil">
          <p>Informações pessoais</p>

          {carregando ? (
            <p>Carregando...</p>
          ) : !editando ? (
            <>
              <div className="cl">
                <p className="desc">Nome :</p>
                <p className="fs18">{perfil.nomeUser}</p>
              </div>
              <div className="cl">
                <p className="desc">Email :</p>
                <p className="fs18">{perfil.emailUser}</p>
              </div>
              <div className="cl">
                <p className="desc">Telefone :</p>
                <p className="fs18">{perfil.telefone}</p>
              </div>
              <button className="btn-C fc as-fe" onClick={iniciarEdicao}>
                <span className="icon pencil"></span>
                <p>Editar perfil</p>
              </button>
            </>
          ) : (
            <>
              <div className="cl">
                <p className="desc">Nome :</p>
                <input type="text" value={form.nomeUser} onChange={(e) => setForm({ ...form, nomeUser: e.target.value })} />
              </div>
              <div className="cl">
                <p className="desc">Email :</p>
                <input type="email" value={form.emailUser} onChange={(e) => setForm({ ...form, emailUser: e.target.value })} />
              </div>
              <div className="cl">
                <p className="desc">Telefone :</p>
                <input
                  type="text"
                  placeholder="Apenas números"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                />
              </div>
              <div className="cl">
                <p className="desc">Nova Senha :</p>
                <input
                  type="password"
                  placeholder="Deixe em branco para não alterar"
                  value={form.novaSenha}
                  onChange={(e) => setForm({ ...form, novaSenha: e.target.value })}
                />
              </div>
              <div className="cl">
                <p className="desc">Confirmar Senha :</p>
                <input
                  type="password"
                  value={form.confirmarSenha}
                  onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })}
                />
              </div>
              <button className="btn-C fc as-fe" onClick={salvar}>
                <span className="icon pencil"></span>
                <p>Salvar Alterações</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}