/* Função para recuperar os links de outras cidades
e utilizar para alterar a cidadde de pesquisa 

Sintaxe:
=GETLINKSFROMTABLE(url, table_index))
*/

function GETLINKSFROMTABLE(url, table_index) {
  try{
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

    rows.forEach(row => {
      //Atribui toda a tabela á variavel "result"]]
      const cells = row.match(/<t[dh][\s\S]*?<\/t[dh]>/gi);
      if (!cells) return [["Não foram encontrado dados nesta tabela"]];

      const rowData = cells.map(cell => {
        const text = cell.replace(/<[^>]+>/g, '').trim(); //regex para limpar o texto das tags html
        const hrefMatch = cell.match(/href="(.*?)"/i);  //regex para isolar o link
        const link = hrefMatch ? hrefMatch[1] : "";

        return[text, link];
      })
      //Formata a linha corretamente
      //result.push(rowData.flat()); //os links ficam em 6 colunas
      rowData.forEach(item => result.push(item)); // link em 2 colunas
    })

    return result;
  } catch (err) {
    return [["Erro ao processar: ", err.message]];
  }
}
