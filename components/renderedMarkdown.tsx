import { Image, Text, Code, Snippet, Display, Loading, Collapse } from '@geist-ui/core'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

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

const RenderedMarkdown = (props: any) => {
  const { markdown, ignoreCustomComponents } = props

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className="markdown-body"
        components={ignoreCustomComponents ? undefined : {
          code: ({ node, ...props }) => <DynamicCodeSnippet {...props} />,
          img: ({ node, ...props }) => <DynamicImage {...props} />,
          // details: ({ node, ...props }) => <DynamicDetails {...props} />, TODO: implement properly
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default RenderedMarkdown