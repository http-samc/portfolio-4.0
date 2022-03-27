import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer } from "@geist-ui/core";
import getRandomThemeColor from "../../utils/get-random-theme-color";
var yfm = require('yaml-front-matter')

export const getStaticPaths = async () => {
    const res = await fetch('https://api.github.com/repos/http-samc/smrth.dev/git/trees/main?recursive=1')
    const data = await res.json();

    const paths = data.tree.map((item: any) => {
        if (
            item.path.startsWith('content/blog/')
            && item.path.endsWith('.md')
            && !item.path.includes('%2F')
            && !item.path.includes('_')
        ) {
            return {
                params: {
                    post: item.path.replace('content/blog/', '').replace('.md', '')
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
    const { post } = context.params;
    const res = await fetch(`https://raw.githubusercontent.com/http-samc/smrth.dev/main/content/blog/${post}.md`);
    const data = await res.text();
    return {
        props: {
            post: data
        }
    }
}

const Post = ({ post }: any) => {
    const parsedPost = yfm.loadFront(post)
    return (
        <div>
            <Text h1>{parsedPost.title}</Text>
            {
                parsedPost.tags.map((tag: string, idx: number) => {
                    return <Badge
                        style={{
                            backgroundColor: getRandomThemeColor(),
                            marginRight: '5px',
                            marginBottom: '5px'
                        }}
                        key={idx.toString()}
                    >
                        {tag}
                    </Badge>
                })
            }
            <Spacer />
            <Text i>
                {parsedPost.author} via {<Link icon color href={parsedPost.source}>dev.to</Link>} • {parsedPost.date}
            </Text>
            <Spacer h={2} />
            <div className='cover-img-container'>
                <img className="cover-img" src={parsedPost.cover} />
            </div>
            <Spacer h={2} />
            <RenderedMarkdown
                markdown={parsedPost.__content}
            />
        </div>
    )
}

export default Post