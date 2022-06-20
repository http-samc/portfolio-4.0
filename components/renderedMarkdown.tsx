/* eslint-disable jsx-a11y/alt-text */
import { Image, Text, Code, Snippet, Display, Loading, Collapse, Link, useTheme } from '@geist-ui/core'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { RoughNotation } from "react-rough-notation";
import getRandomThemeColor from '../utils/get-random-theme-color';
import { COLORS } from '../utils/get-random-theme-color';
import hash from '../utils/hash';

const getDetailsSummary = (props: any) => {
  for (let i = 0; i < props.children.length; i++) {
    if (props.children[i].type === 'details') {
      return props.children[i]
    }
  }
}

const DynamicDetails = (props: any) => {
  const summary = getDetailsSummary(props)
  let children = []

  console.warn(props)
  return (
    <Collapse {...props}>
    </Collapse>
  )
}

const DynamicCodeSnippet = (props: any) => {
  if (props.inline && props.children[0][0] == ' ') {
    return <Snippet {...props} />
  }
  else if (props.className && props.className.split('::').length > 1) {
    return (
      <Code
        className={props.className.split('::')[0]}
        name={props.className.split('::')[1]}
        block
      >
        {props.children}
      </Code>
    )
  }
  return <Code {...props} />
}

const DynamicImage = (props: any) => {
  if (props.alt && props.alt.startsWith(' ')) {
    return (
      <Display shadow caption={<Text>{props.alt}</Text>}>
        <Image.Browser url={props.src}>
          <Image
            style={{ maxHeight: '500px', height: 'auto', width: '100%' }}
            alt={props.alt.substring(1)}
            src={props.src}
            draggable={false}
          />
        </Image.Browser>
      </Display>
    )
  }
  else if (props.alt) {
    return (
      <Display shadow caption={<Text>{props.alt}</Text>}>
        <Image style={{ maxHeight: '500px', height: 'auto', width: '100%' }} {...props} draggable={false} />
      </Display>
    )
  }
  return <Image style={{ marginLeft: 'auto', marginRight: 'auto' }} {...props} draggable={false} />
}

const DynamicLink = (props: any) => {
  const theme = useTheme();
  if (props.children.length > 1 || props.children[0].type === 'img') return props.children;
  let pos = props.children[0].length;
  for (let c of hash(props.children[0])) {
    if (parseInt(c))
      pos += parseInt(c)
    else
      pos += c.charCodeAt(0)
  }
  let color = COLORS[pos % COLORS.length]

  return (
    <Link href={props.href}>
      <RoughNotation
        type={props.href.startsWith("/") ? "highlight" : "underline"}
        color={theme.type == "dark" ? "#f81ce6" : "#79ffe1"}
        show
      >
        <span style={{
          color: color,
          fontWeight: "bold"
        }}>{props.children}</span>
      </RoughNotation>
    </Link>
  )
}

const RenderedMarkdown = (props: any) => {
  const { markdown, ignoreCustomComponents } = props

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className="markdown-body"
        components={
          ignoreCustomComponents
            ? { a: ({ node, ...props }) => <DynamicLink {...props} /> }
            : {
              code: ({ node, ...props }) => <DynamicCodeSnippet {...props} />,
              img: ({ node, ...props }) => <DynamicImage {...props} />,
              a: ({ node, ...props }) => <DynamicLink {...props} />,
              // details: ({ node, ...props }) => <DynamicDetails {...props} />, TODO: implement properly
            }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default RenderedMarkdown