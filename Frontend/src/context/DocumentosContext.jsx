/**
 * context/DocumentosContext.jsx
 * Centraliza o fetch de /aluno/documentos (tiposEnviados, ultimos, historico, prazos).
 * Substitui a lógica que estava duplicada em progresso.js e sino.js.
 *
 * Usado por: Nav (badge do sino), AreaAluno (barra de progresso + último doc),
 * Enviados (listas), e pelos popups de notificação/prazos.
 */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Api } from '../services/api';

const DocumentosContext = createContext(null);

export function DocumentosProvider({ children }) {
  const [dados, setDados] = useState({
    tiposEnviados: [],
    ultimos: [],
    historico: [],
    prazos: [],
  });
  const [carregando, setCarregando] = useState(true);
  const [notifPopupAberto, setNotifPopupAberto] = useState(false);
  const [prazosPopupAberto, setPrazosPopupAberto] = useState(false);

  const notificacoes = dados.prazos.filter((p) => p.vencido || p.urgente);

  const carregar = useCallback(async () => {
    const alunoId = localStorage.getItem('idaluno');
    if (!alunoId) {
      setCarregando(false);
      return;
    }

    try {
      const data = await Api.post('/aluno/documentos', { aluno_id: alunoId });
      if (data?.erro) {
        console.error(data.erro);
        return;
      }
      setDados({
        tiposEnviados: data.tiposEnviados || [],
        ultimos: data.ultimos || [],
        historico: data.historico || [],
        prazos: data.prazos || [],
      });
    } catch (e) {
      console.error('Erro ao carregar documentos do aluno:', e);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // Exibe o popup de notificações automaticamente uma vez por sessão
  // (equivalente ao sessionStorage.getItem('notif_exibida') do original)
  useEffect(() => {
    if (notificacoes.length > 0 && !sessionStorage.getItem('notif_exibida')) {
      setNotifPopupAberto(true);
      sessionStorage.setItem('notif_exibida', '1');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dados.prazos]);

  const value = {
    ...dados,
    notificacoes,
    carregando,
    recarregar: carregar,
    notifPopupAberto,
    fecharNotifPopup: () => setNotifPopupAberto(false),
    prazosPopupAberto,
    abrirPrazosPopup: () => setPrazosPopupAberto(true),
    fecharPrazosPopup: () => setPrazosPopupAberto(false),
  };

  return <DocumentosContext.Provider value={value}>{children}</DocumentosContext.Provider>;
}

export function useDocumentos() {
  const ctx = useContext(DocumentosContext);
  if (!ctx) throw new Error('useDocumentos deve ser usado dentro de <DocumentosProvider>');
  return ctx;
}