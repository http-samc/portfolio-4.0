import RenderedMarkdown from "../components/renderedMarkdown"
import PageLayout from "../layout/page";
import fs from 'fs'

export const getStaticProps = async (context: any) => {
    const research = fs.readFileSync(`${process.cwd()}/content/research.md`, 'utf8')

    return {
        props: {
            research
        }
    }
}

const Research = ({ research, setTheme }: any) => {
    return (
        <PageLayout setTheme={setTheme}>
            <RenderedMarkdown
                markdown={research}
                ignoreCustomComponents={false}
            />
        </PageLayout>
    )
}

export default Research