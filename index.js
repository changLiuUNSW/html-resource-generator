var fs = require('fs');
const fse = require('fs-extra');
const cheerio = require('cheerio');

module.exports = (html, output, prefix) => {
  const result = {
    styles: [],
    scripts: []
  };
  let contents = fs.readFileSync(html, 'utf8');
  let $ = cheerio.load(contents);

  $('link[rel="stylesheet"]').each(function(i, elem) {
    let style = $(elem).attr('href');
    if (style) {
      result.styles.push({ inline: false, value: prefix + style });
    }
  });

  $('script').each(function(i, elem) {
    const script = $(elem).attr('src');
    if (script) {
      result.scripts.push({ inline: false, value: prefix + script });
    } else {
      result.scripts.push({ inline: true, value: $(elem).html() });
    }
  });

  fse.outputFileSync(output, JSON.stringify(result));
};
