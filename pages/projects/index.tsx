import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer, Grid, Card, Snippet, Input, Button, Modal } from "@geist-ui/core";
import getRandomThemeColor, { COLORS } from "../../utils/get-random-theme-color";
import { useRouter } from "next/router";
const yfm = require('yaml-front-matter')
import fs from 'fs'
import { useState } from "react";
import hash from "../../utils/hash";
import { useMediaQuery } from "usehooks-ts";
import { Search } from "@geist-ui/icons";

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

const Project = ({ projects }: any) => {
    const router = useRouter()
    const [tags, setTags] = useState<string[]>([])
    const [visibleTag, setVisibleTag] = useState<string>('all')
    const isMedium = useMediaQuery('(min-width: 440px) and (max-width: 900px)')
    const isSmall = useMediaQuery('(max-width: 670px)')
    const [showSearch, setShowSearch] = useState(false)
    const [search, setSearch] = useState('')

    return (
        <div>
            <div style={{
                display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', alignItems: 'center'
            }}
            >
                <Text h1>My Projects 🚀</Text>
                {!isSmall &&
                    <Input
                        htmlType="search"
                        placeholder="search..."
                        iconRight={<Search />}
                        scale={isSmall ? 1 : 1.5}
                        onChange={(e: any) => setSearch(e.target.value)}
                        value={search}
                    />
                }
                {isSmall &&
                    <Button
                        auto
                        ghost
                        type='secondary'
                        icon={<Search />}
                        onClick={() => setShowSearch(true)}
                    />
                }
                <Modal visible={showSearch}>
                    <Input
                        htmlType="search"
                        placeholder="search..."
                        iconRight={<Search />}
                        scale={isSmall ? 1 : 1.5}
                        onChange={(e: any) => setSearch(e.target.value)}
                        value={search}
                        width='100%'
                    />
                    <Modal.Action onClick={() => { setSearch(''); setShowSearch(false) }}>
                        Cancel
                    </Modal.Action>
                    <Modal.Action onClick={() => setShowSearch(false)}>
                        Submit
                    </Modal.Action>
                </Modal>
            </div>
            <Spacer />
            <div className="grid-filter">
                <span
                    style={{
                        marginRight: '5px',
                        marginBottom: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        userSelect: 'none'
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
                            style={{
                                color: color,
                                userSelect: 'none',
                                backgroundColor: tag == visibleTag ? '#f5f5f5' : '',
                                borderRadius: 5,
                            }}
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
                        if (search) {
                            if (!project.title.toLowerCase().includes(search.toLowerCase()))
                                return null
                        }
                        return (
                            <Grid xs={24} md={project.important ? 16 : 8} width="100%" key={idx} style={{
                                display: project.tags.includes(visibleTag) || visibleTag == 'all' ? 'block' : 'none'
                            }}>
                                <Card
                                    width="100%"
                                    height="auto"
                                    className="card"
                                    shadow
                                >
                                    <Card.Content
                                        style={{
                                            display: 'flex',
                                            flexDirection: !isMedium ? 'column' : 'row-reverse',
                                            justifyContent: 'space-between',
                                            flexGrow: 1
                                        }}
                                        width="100%"
                                        onClick={() => {
                                            project.redirect
                                                ? router.push(project.redirect)
                                                : router.push(`/projects/${project.urlPath}`)
                                        }}
                                    >
                                        <Image
                                            src={project.cover}
                                            height={project.important && !isMedium ? '125px' : '100px'}
                                            width="auto"
                                            draggable={false}
                                            style={{ borderRadius: 5, overflow: 'hidden', margin: !isMedium ? '0px' : '5px' }}
                                        />
                                        {!isMedium && <Spacer h={1} />}
                                        <div style={{ width: !isMedium ? '' : '80%' }}>
                                            <Text h4 style={{ marginBottom: -10 }}>{project.title}</Text>
                                            <Text>{project.description}</Text>
                                        </div>
                                    </Card.Content>
                                    <Card.Footer style={{ display: 'flex', flexGrow: 0.5, flexWrap: 'wrap' }}>
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
                                                        marginBottom: '5px',
                                                        color: 'white',
                                                        textAlign: 'center',
                                                    }}
                                                    key={idx.toString()}
                                                    className={tag}
                                                    onClick={() => setVisibleTag(tag)}
                                                >
                                                    {tag}
                                                </Badge>
                                            })
                                        }
                                    </Card.Footer>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid.Container>
            <Spacer h={2} />
        </div >
    )
}

export default Project
