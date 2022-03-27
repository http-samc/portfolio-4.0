import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer, Grid, Card, Snippet } from "@geist-ui/core";
import getRandomThemeColor from "../../utils/get-random-theme-color";
import { useRouter } from "next/router";
var yfm = require('yaml-front-matter')

const getStaticPaths = async () => {
    const res = await fetch('https://api.github.com/repos/http-samc/smrth.dev/git/trees/main?recursive=1')
    // const res = await fetch('http://127.0.0.1:5500/mock.json')
    const data = await res.json();

    const paths = data.tree.map((item: any) => {
        if (item.path.startsWith('content/blog/')
            && item.path.endsWith('.md')
            && !item.path.includes('%2F')
            && !item.path.includes('_')
        ) {
            return {
                post: item.path.replace('content/blog/', '').replace('.md', '')
            }
        }
    })

    return paths.filter(Boolean)
}

export const getStaticProps = async (context: any) => {
    const posts = await getStaticPaths()
    const data: any = []
    for (const { post } of posts) {
        if (post.startsWith('_'))
            continue
        let res = await fetch(`https://raw.githubusercontent.com/http-samc/smrth.dev/main/content/blog/${post}.md`)
        let text = await res.text()
        data.push({ ...yfm.loadFront(text), ...{ urlPath: post } })
    }
    return {
        props: {
            posts: data
        }
    }
}

const Blog = ({ posts }: any) => {
    const router = useRouter()
    return (
        <div>
            <Text h1>
                <Snippet type="success" filled copy="prevent">echo "Sam's Blog"</Snippet>
            </Text>
            <Spacer h={2} />
            <Grid.Container gap={2} justify='center'>
                {
                    posts.map((post: any, idx: number) => {
                        return (
                            <Grid xs={24} md={8} lg={post.important ? 16 : 8} key={idx}>
                                <Card
                                    width="100%"
                                    height="auto"
                                    className="card"
                                    onClick={() => {
                                        router.push(`/blog/${post.urlPath}`)
                                    }}
                                    shadow
                                >
                                    <Text h4>{post.title}</Text>
                                    <Spacer />
                                    {
                                        post.tags.map((tag: string, idx: number) => {
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
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid.Container>
            <Spacer h={2} />
        </div>
    )
}

export default Blog
