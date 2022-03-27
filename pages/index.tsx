import RenderedMarkdown from "../components/renderedMarkdown"
import fs from 'fs'

export const getStaticProps = async (context: any) => {
    const homepage = fs.readFileSync(`${process.cwd()}/content/index.md`, 'utf8')

    return {
        props: {
            homepage
        }
    }
}

const Home = ({ homepage }: any) => {
    return (
        <RenderedMarkdown
            markdown={homepage}
            ignoreCustomComponents={true}
        />
    )
}

export default Home