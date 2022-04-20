import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer, Grid, Card, Snippet } from "@geist-ui/core";
import getRandomThemeColor, { COLORS } from "../../utils/get-random-theme-color";
import { useRouter } from "next/router";
const yfm = require('yaml-front-matter')
import fs from 'fs'
import { useState } from "react";
import hash from "../../utils/hash";

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
    const [tags, setTags] = useState<string[]>([])
    const [visibleTag, setVisibleTag] = useState<string>('all')

    return (
        <div>
            <Text h1>My Projects 🚀</Text>
            <div className="grid-filter">
                <span
                    style={{
                        marginRight: '5px',
                        marginBottom: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                    onClick={() => setVisibleTag('all')}
                >
                    #all
                </span>
                {
                    tags.map((tag: string, idx: number) => {
                        let pos = tag.length;
                        for (let c of hash(tag)) {
                            if (parseInt(c))
                                pos += parseInt(c)
                            else
                                pos += c.charCodeAt(0)
                        }
                        let color = COLORS[pos % COLORS.length]

                        return <span
                            style={{ color: color }}
                            key={idx.toString()}
                            className={tag}
                            onClick={() => setVisibleTag(tag)}
                        >
                            #{tag}
                        </span>
                    })
                }
            </div>
            <Spacer h={1} />
            <Grid.Container gap={2} justify='center'>
                {
                    projects.map((project: any, idx: number) => {
                        return (
                            <Grid xs={24} md={project.important ? 16 : 8} width="100%" key={idx} style={{
                                display: project.tags.includes(visibleTag) || visibleTag == 'all' ? 'block' : 'none'
                            }}>
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
                                    <Text>{project.description}</Text>
                                    <Spacer />
                                    {
                                        project.tags.map((tag: string, idx: number) => {
                                            tags.includes(tag) || setTags([...tags, tag])
                                            let pos = tag.length;
                                            for (let c of hash(tag)) {
                                                if (parseInt(c))
                                                    pos += parseInt(c)
                                                else
                                                    pos += c.charCodeAt(0)
                                            }
                                            let color = COLORS[pos % COLORS.length]
                                            return <Badge
                                                style={{
                                                    backgroundColor: color,
                                                    marginRight: '5px',
                                                    marginBottom: '5px',
                                                    color: 'white'
                                                }}
                                                key={idx.toString()}
                                                className={tag}
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
