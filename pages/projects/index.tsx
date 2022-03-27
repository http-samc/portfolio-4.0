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
        if (item.path.startsWith('content/projects/')
            && item.path.endsWith('.md')
            && !item.path.includes('%2F')
            && !item.path.includes('_')
        ) {
            return {
                project: item.path.replace('content/projects/', '').replace('.md', '')
            }
        }
    })

    return paths.filter(Boolean)
}

export const getStaticProps = async (context: any) => {
    const projects = await getStaticPaths()
    const data: any = []
    for (const { project } of projects) {
        if (project.startsWith('_'))
            continue
        let res = await fetch(`https://raw.githubusercontent.com/http-samc/smrth.dev/main/content/projects/${project}.md`)
        let text = await res.text()
        data.push({ ...yfm.loadFront(text), ...{ urlPath: project } })
    }
    return {
        props: {
            projects: data
        }
    }
}

const Blog = ({ projects }: any) => {
    const router = useRouter()

    return (
        <div>
            <Text h1>
                <Snippet type="success" filled copy="prevent">echo "Sam's Projects"</Snippet>
            </Text>
            <Spacer h={2} />
            <Grid.Container gap={2} justify='center'>
                {
                    projects.map((project: any, idx: number) => {
                        if (!project.tags) { return null }
                        return (
                            <Grid xs={24} md={8} className={project.important ? "card-important" : ""} key={idx}>
                                <Card
                                    width="100%"
                                    height="auto"
                                    className="card"
                                    onClick={() => {
                                        router.push(`/projects/${project.urlPath}`)
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
