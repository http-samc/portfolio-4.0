import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer } from "@geist-ui/core";
import getRandomThemeColor from "../../utils/get-random-theme-color";
var yfm = require('yaml-front-matter')

export const getStaticPaths = async () => {
    const res = await fetch('https://api.github.com/repos/http-samc/smrth.dev/git/trees/main?recursive=1')
    const data = await res.json();

    const paths = data.tree.map((item: any) => {
        if (
            item.path.startsWith('content/projects/')
            && item.path.endsWith('.md')
            && !item.path.includes('%2F')
            && !item.path.includes('_')
        ) {
            return {
                params: {
                    project: item.path.replace('content/projects/', '').replace('.md', '')
                }
            }
        }
    })
    return {
        paths: paths.filter(Boolean),
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const { project } = context.params;
    const res = await fetch(`https://raw.githubusercontent.com/http-samc/smrth.dev/main/content/projects/${project}.md`);
    const data = await res.text();
    return {
        props: {
            post: data
        }
    }
}

const Project = ({ post }: any) => {
    const parsedProject = yfm.loadFront(post)
    return (
        <div>
            <Text h1>{parsedProject.title}</Text>
            <Text i>{parsedProject.description}</Text>
            <Spacer />
            {
                parsedProject.tags.map((tag: string, idx: number) => {
                    return <Badge
                        style={{
                            backgroundColor: getRandomThemeColor(),
                            marginRight: '5px',
                            marginBottom: '5px'
                        }}
                        key={idx.toString()}
                        className='tag'
                    >
                        {tag}
                    </Badge>
                })
            }
            <Spacer h={2} />
            {
                parsedProject.cover
                    ?
                    <div className='cover-img-container'>
                        <img className="cover-img" src={parsedProject.cover} />
                        <Spacer h={2} />
                    </div>
                    : null
            }
            <RenderedMarkdown
                markdown={parsedProject.__content}
            />
        </div>
    )
}

export default Project