import RenderedMarkdown from "../components/renderedMarkdown"
import fs from 'fs'

export const getStaticProps = async (context: any) => {
    const research = fs.readFileSync(`${process.cwd()}/content/research.md`, 'utf8')

    return {
        props: {
            research
        }
    }
}

const Research = ({ research }: any) => {
    return (
        <RenderedMarkdown
            markdown={research}
            ignoreCustomComponents={false}
        />
    )
}

export default Research