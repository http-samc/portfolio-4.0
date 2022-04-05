import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer, Grid, Card, Snippet } from "@geist-ui/core";
import getRandomThemeColor, { COLORS } from "../../utils/get-random-theme-color";
import { useRouter } from "next/router";
const yfm = require('yaml-front-matter')
import fs from 'fs'

const getStaticPaths = () => {
    let postPaths = fs.readdirSync(`${process.cwd()}/content/blog`)
    return postPaths
}

export const getStaticProps = (context: any) => {
    const posts = getStaticPaths()
    const data: any = []
    for (const post of posts) {
        let text = fs.readFileSync(`${process.cwd()}/content/blog/${post}`, 'utf8')
        data.push({ ...yfm.loadFront(text), ...{ urlPath: post.replace('.md', '') } })
    }
    return {
        props: {
            posts: data
        }
    }
}

const Blog = ({ posts }: any) => {
    const router = useRouter()

    // let colors = COLORS
    // let tagLookup: any = {}

    // const getTagColor = (tag: string) => {
    //     if (tagLookup[tag]) {
    //         return tagLookup[tag]
    //     }
    //     let color = colors.pop()
    //     tagLookup[tag] = color
    //     return color
    // }

    return (
        <div>
            <Text h1>My Blog 📒</Text>
            <Grid.Container gap={2} justify='center'>
                {
                    posts.map((post: any, idx: number) => {
                        return (
                            <Grid xs={24} md={8} lg={post.important ? 16 : 8} width="100%" key={idx}>
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
