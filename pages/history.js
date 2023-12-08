import styles from '../styles/History.module.css'
import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import { searchHistoryAtom } from '../store'

import { removeFromHistory } from '../lib/userData'

import { Row, Card, ListGroup, Button } from 'react-bootstrap'

export default function SearchHistory() {
    const router = useRouter()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    let parsedHistory = []
    searchHistory.forEach((h) => {
        let params = new URLSearchParams(h)
        let entries = params.entries()
        parsedHistory.push(Object.fromEntries(entries))
    })

    const historyClicked = (e, index) => {
        e.preventDefault()
        router.push(`/artwork?${searchHistory[index]}`)
    }

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation() 
        setSearchHistory(await removeFromHistory(searchHistory[index]))
    }

    if (!searchHistory) return null

    return (
        searchHistory && (
            <Row className='gy-4'>
                {!searchHistory.length ? (
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h4>Nothing Here</h4>
                            </Card.Title>
                            <Card.Text>
                                Nothing Here. Try searching for some artwork
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : (
                    <ListGroup>
                        {parsedHistory.map((h, index) => (
                            <ListGroup.Item
                                key={index}
                                onClick={(e) => historyClicked(e, index)}
                                className={styles.historyListItem}
                            >
                                {Object.keys(h).map((key) => (
                                    <>
                                        {key}: <strong>{h[key]}</strong>
                                        &nbsp;
                                    </>
                                ))}
                                <Button
                                    className='float-end'
                                    variant='danger'
                                    size='sm'
                                    onClick={(e) =>
                                        removeHistoryClicked(e, index)
                                    }
                                >
                                    &times;
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Row>
        )
    )
}
