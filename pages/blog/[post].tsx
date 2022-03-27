import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer } from "@geist-ui/core";
import getRandomThemeColor from "../../utils/get-random-theme-color";
const yfm = require('yaml-front-matter')
import fs from 'fs'

export const getStaticPaths = async () => {
    let postPaths = fs.readdirSync(`${process.cwd()}/content/blog`)
    let paths = postPaths.map((post: string) => {
        return { params: { post: post.replace('.md', '') } }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const { post } = context.params;
    const postText = fs.readFileSync(`${process.cwd()}/content/blog/${post}.md`, 'utf8')
    return {
        props: {
            post: postText
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