import DOMPurify from 'dompurify'

export function bbcodeToHtml(input) {
  let text = input

  const codes = [];
  text = text.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (_, code) => {
    const ph = `__CODE_${codes.length}__`
    codes.push(`<pre class="bg-light p-2 rounded border"><code>${DOMPurify.sanitize(code)}</code></pre>`)
    return ph
  })

  text = text
    .replace(/\[b\]([\s\S]*?)\[\/b\]/gi, "<strong>$1</strong>")
    .replace(/\[i\]([\s\S]*?)\[\/i\]/gi, "<em>$1</em>")
    .replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '<span class="text-decoration-underline">$1</span>')
    .replace(/\[s\]([\s\S]*?)\[\/s\]/gi, '<span class="text-decoration-line-through">$1</span>')
    .replace(/\[url=(https?:\/\/[^\s]+)\]([\s\S]*?)\[\/url\]/gi, '<a href="$1" class="link-primary" target="_blank" rel="nofollow">$2</a>')
    .replace(/\[url\](https?:\/\/[^\s]+)\[\/url\]/gi, '<a href="$1" class="link-primary" target="_blank" rel="nofollow">$1</a>')
    .replace(/\[img\](https?:\/\/[^\s]+)\[\/img\]/gi, '<img src="$1" class="img-fluid rounded" alt="">')
    .replace(/\[img=([\s\S]*?)\]([\s\S]*?)\[\/img\]/gi, '<img src="$1" alt="$2" title="$2" class="img-fluid rounded">')
    .replace(/\[center\]([\s\S]*?)\[\/center\]/gi, '<div class="text-center">$1</div>')
    .replace(/\[color=(\w+)\]([\s\S]*?)\[\/color\]/gi, '<span class="text-$1">$2</span>')
    .replace(/\[size=(\d)\]([\s\S]*?)\[\/size\]/gi, '<span class="fs-$1">$2</span>')
    .replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, '<figure><blockquote class="blockquote">$1</blockquote><figcaption class="blockquote-footer">Кто-то знаменитый</figcaption></figure>')
    .replace(/\[quote=([^\]\s]+)(?:\s+style=(\w+))?\]([\s\S]*?)\[\/quote\]/gis,
      function(_, name, style, content) {
        let footer = ""
        switch ((style || "default").toLowerCase()) {
          case "forum":
            footer = `Сообщение от <cite>${name}</cite>`
            break
          case "minimal":
            footer = `<cite>${name}</cite>`
            break
          default:
            footer = `<cite>${name}</cite> сказал:`
        }
        return `<figure><blockquote class="blockquote">${content}</blockquote><figcaption class="blockquote-footer">${footer}</figcaption></figure>`
      }
    )
  codes.forEach((c,i) => text = text.replace(`__CODE_${i}__`, c))

  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ["strong","em","span","a","img","div","figure","blockquote","figcaption","pre","code"],
    ALLOWED_ATTR: ["class","href","src","alt","rel","target","title","style"]
  })
}

console.log('%cBootstrap BBCode Parser v1.0.1 loaded! %chttps://github.com/mohovikov/bootstrap-bbcode/wiki/How-to-use', 'color: green; font-weight: bold;', 'color: blue; text-decoration: underline;');

export default { bbcodeToHtml }