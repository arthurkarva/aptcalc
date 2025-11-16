/* Função para realizar a função IMPORTHTML
Sintaxe:
=SCRAPTABLE(url, table_index))
*/

function SCRAPTABLE(url, table_index) {
  try {
    //Chama url da pagina
    const answer = UrlFetchApp.fetch(url);
    const html = answer.getContentText();

    //Regex para obter tabelas
    const table = html.match(/<table[\s\S]*?<\/table>/gi);
    if (!table || table.length === 0) return [["Nenhuma tabela encontrada"]];
    const table_HTML = table[table_index || 0];
    //Atribui todas as linhas da tabela á variável
    const rows = table_HTML.match(/<tr[\s\S]*?<\/tr>/gi)
    if (!rows) return [["Nenhuma linha encontrada"]];
    const result = [];

    //Atribui toda a tabela á variavel "result"]]
    rows.forEach(row => {
      
      const cells = row.match(/<t[dh][\s\S]*?<\/t[dh]>/gi);
      if (!cells) return [["Não foram encontrado dados nesta tabela"]];
      const rowData = cells.map(cell => {
        const text = cell.replace(/<[^>]+>/g, '').trim(); //regex para limpar o texto das tags html
        return[text];
      })
      result.push(rowData.flat());
    })
    return result
  } catch (err) {
    return [["Erro ao processar: ", err.message]];
  }
}

