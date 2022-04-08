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
  return <Code {...props} />

}

const DynamicImage = (props: any) => {
  if (props.alt) {
    return (
      <Display shadow caption={<Text>{props.alt}</Text>}>
        <Image style={{ maxHeight: '500px', height: 'auto', width: '100%' }} {...props} />
      </Display>
    )
  }
  return <Image style={{ marginLeft: 'auto', marginRight: 'auto' }} {...props} />
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
          details: ({ node, ...props }) => <DynamicDetails {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default RenderedMarkdown