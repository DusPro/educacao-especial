
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [form, setForm] = useState({
    nome: '', cidade: '', estado: '', escola: '', turno: ''
  });
  const [tema, setTema] = useState('');
  const [atividade, setAtividade] = useState(null);
  const [tipoAtividade, setTipoAtividade] = useState('atividade');
  const [historico, setHistorico] = useState([]);
  const [entradaTexto, setEntradaTexto] = useState('');

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const gerarConteudo = () => {
    const id = uuidv4();
    let saida = '';
    if (tipoAtividade === 'diario') {
      saida = \`Você é um especialista em redação pedagógica e formal.\nReformule o seguinte trecho do diário de bordo para torná-lo mais técnico e pedagógico:\n\n"\${entradaTexto}"\`;
    } else if (tipoAtividade === 'pei') {
      saida = \`Você é um assistente especializado na elaboração de PEI para educação especial. Gere um PEI bimestral com base nas informações:\n\n"\${entradaTexto}"\`;
    } else if (tipoAtividade === 'relatorio') {
      saida = \`Você é um redator pedagógico com foco em educação especial. Gere um relatório bimestral a partir dos dados:\n\n"\${entradaTexto}"\`;
    } else {
      saida = \`Você é um criador de atividades pedagógicas para alunos com deficiência. Com base no tema "\${tema}", gere:\n1. Texto robusto sobre o tema\n2. 10 questões com 4 alternativas (A, B, C, D)\n3. Prompt de imagem claro para cada alternativa\n4. Explicações detalhadas por questão\n5. Gabarito ao final\n6. Fontes confiáveis para consulta.\`;
    }

    const novaAtividade = {
      id,
      tipo: tipoAtividade,
      prompt: saida,
      criadoEm: new Date().toLocaleString()
    };
    setAtividade(novaAtividade);
    setHistorico([...historico, novaAtividade]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Educa Especial — Plataforma Inteligente</h1>

      <section className="mb-6 bg-gray-50 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Cadastro do Professor</h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="nome" value={form.nome} onChange={handleInput} placeholder="Nome" className="border p-2 rounded" />
          <input name="cidade" value={form.cidade} onChange={handleInput} placeholder="Cidade" className="border p-2 rounded" />
          <input name="estado" value={form.estado} onChange={handleInput} placeholder="Estado" className="border p-2 rounded" />
          <input name="escola" value={form.escola} onChange={handleInput} placeholder="Escola" className="border p-2 rounded" />
          <input name="turno" value={form.turno} onChange={handleInput} placeholder="Turno" className="border p-2 rounded" />
        </div>
      </section>

      <section className="mb-6 bg-white p-4 rounded-md border">
        <h2 className="text-lg font-semibold mb-2">Gerar Produção Pedagógica</h2>

        <label className="block mb-1 font-medium">Tipo de produção:</label>
        <select value={tipoAtividade} onChange={(e) => setTipoAtividade(e.target.value)} className="border p-2 rounded w-full mb-3">
          <option value="diario">Diário de Bordo (Formalização)</option>
          <option value="pei">PEI Bimestral</option>
          <option value="relatorio">Relatório Bimestral</option>
          <option value="atividade">Atividade Adaptada</option>
        </select>

        {tipoAtividade === 'atividade' ? (
          <input value={tema} onChange={(e) => setTema(e.target.value)} placeholder="Digite o tema da aula" className="border p-2 w-full mb-2 rounded" />
        ) : (
          <textarea value={entradaTexto} onChange={(e) => setEntradaTexto(e.target.value)} placeholder="Cole aqui seu texto ou informações base" className="border p-2 w-full mb-2 h-32 rounded" />
        )}

        <button onClick={gerarConteudo} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Gerar</button>
      </section>

      {atividade && (
        <section className="bg-green-50 p-4 rounded-md mb-6">
          <h3 className="text-lg font-bold mb-2">Prompt Gerado ({atividade.tipo})</h3>
          <pre className="whitespace-pre-wrap text-gray-800 text-sm bg-white p-3 rounded border overflow-auto">{atividade.prompt}</pre>
        </section>
      )}

      <section className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Histórico de Produções</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {historico.map((h) => (
            <li key={h.id}>{h.tipo.toUpperCase()} — {h.criadoEm}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
