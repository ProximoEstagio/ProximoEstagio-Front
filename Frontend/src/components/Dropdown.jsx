/**
 * components/Dropdown.jsx
 * Substitui o Web Component <custom-dropdown> de dropdown.js.
 *
 * Diferenças da versão original:
 *  - Era um Custom Element com Shadow DOM (estilos isolados). Em React,
 *    isolamento de estilo assim não é o padrão — os estilos foram movidos
 *    pra Dropdown.css (importe esse arquivo uma vez no seu App, ou troque
 *    pelas classes/CSS do seu design system).
 *  - Controlado por props (`value`/`onChange`) em vez de eventos DOM customizados.
 *
 * Uso:
 *   <Dropdown
 *     placeholder="Selecione..."
 *     options={['Opção 1', 'Opção 2']}           // ou [{ value, label }]
 *     value={valor}
 *     onChange={(novoValor) => setValor(novoValor)}
 *   />
 */
import { useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import './Dropdown.css';

export default function Dropdown({ options, placeholder = 'Selecione...', value, onChange }) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setAberto(false));

  const normalizado = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );
  const selecionado = normalizado.find((opt) => opt.value === value);

  const escolher = (opt) => {
    onChange?.(opt.value);
    setAberto(false);
  };

  return (
    <div ref={ref} className="custom-dropdown">
      <label className="selected-label" onClick={() => setAberto((v) => !v)}>
        <span>{selecionado ? selecionado.label : placeholder}</span>
      </label>
      {aberto && (
        <div className="options">
          {normalizado.map((opt) => (
            <label key={opt.value} data-value={opt.value} onClick={() => escolher(opt)}>
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}