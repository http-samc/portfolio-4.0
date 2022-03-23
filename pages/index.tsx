import RenderedMarkdown from "../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer } from "@geist-ui/core";
import getRandomThemeColor from "../utils/get-random-theme-color";

export const getStaticProps = async (context: any) => {
    const res = await fetch(`https://raw.githubusercontent.com/http-samc/smrth.dev/main/content/_root.md`);
    const data = await res.text();
    return {
        props: {
            post: data
        }
    }
}

const Home = ({ post }: any) => {
    return (
        <RenderedMarkdown
            markdown={post}
            ignoreCustomComponents={true}
        />
    )
}

export default Home