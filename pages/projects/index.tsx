import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer, Grid, Card, Snippet } from "@geist-ui/core";
import getRandomThemeColor, { COLORS } from "../../utils/get-random-theme-color";
import { useRouter } from "next/router";
const yfm = require('yaml-front-matter')
import fs from 'fs'

const getStaticPaths = () => {
    let projectPaths = fs.readdirSync(`${process.cwd()}/content/projects`)
    return projectPaths
}

export const getStaticProps = (context: any) => {
    const projects = getStaticPaths()
    const data: any = []
    for (const project of projects) {
        let text = fs.readFileSync(`${process.cwd()}/content/projects/${project}`, 'utf8')
        data.push({ ...yfm.loadFront(text), ...{ urlPath: project.replace('.md', '') } })
    }
    return {
        props: {
            projects: data
        }
    }
}

const Blog = ({ projects }: any) => {
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
            <Text h1>My Projects 🚀</Text>
            <Grid.Container gap={2} justify='center'>
                {
                    projects.map((project: any, idx: number) => {
                        return (
                            <Grid xs={24} md={8} className={project.important ? "card-important" : ""} key={idx}>
                                <Card
                                    width="100%"
                                    height="auto"
                                    className="card"
                                    onClick={() => {
                                        project.redirect
                                            ? router.push(project.redirect)
                                            : router.push(`/projects/${project.urlPath}`)
                                    }}
                                    shadow
                                >
                                    <Text h4>{project.title}</Text>
                                    <Text i>{project.description}</Text>
                                    <Spacer />
                                    {
                                        project.tags.map((tag: string, idx: number) => {
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
