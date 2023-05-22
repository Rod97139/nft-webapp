import Navigation from "@/components/Navigation"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Card, Button, Container, Row, Col, Pagination } from "react-bootstrap"



const WalletNfts = () => {
    const route = useRouter()
    const {wallet} = route.query
    const [nfts, setNfts] = useState(null)
    const [offset, setOffset] = useState(0)


    const FetchNfts = () => {
        if (wallet) {
        // fetch(`https://api.opensea.io/v2/orders/ethereum/seaport/listings?asset_contract_address=0xb003ce92f3b2a8f3dd99207c351eaf05bc605262&token_ids=${wallet}&order_by=created_date&order_direction=desc`, {
        // fetch(`https://api.opensea.io/v2/listings/collection/${wallet}/all?limit=100`, {
        fetch(`https://api.opensea.io/api/v1/assets?collection=${wallet}&limit=100&offset=${offset}&order_direction=asc`, {
            
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-API-KEY': 'your API-KEY'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setNfts(data.assets)
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
        }
    }

    const nextPage = () => {
            setOffset(offset + 100)
    }
    const prevPage = () => {
            setOffset(offset - 100)
    }
    

    useEffect(() => {
        FetchNfts()
    }, [wallet, offset])

    return (
        <>
        {nfts ? (
            <Container>
                <Navigation/>
                    <Pagination>
                        {offset > 0 ? <Pagination.Prev onClick={prevPage} /> : <Pagination.Prev />}
                        {offset < 900 ? <Pagination.Next onClick={nextPage} /> : <Pagination.Next />}
                    </Pagination>
                <Row>
                    {nfts.map((nft, index) => (
                        <Col key={index} lg={4} md={6} sm={12}>
                            <Card className="mb-2 card-hover">
                                <Card.Img variant="top" src={nft.image_url} />
                                <Card.Body>
                                    <Card.Title>{nft.name}</Card.Title>
                                    <Card.Text className="text-truncate">
                                        {nft.description}
                                    </Card.Text>
                                    <Link className="btn btn-primary text-decoration-none" href={nft.permalink}>
                                        Lien  Opensea
                                    </Link>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                    <Pagination>
                        {offset > 0 ? <Pagination.Prev onClick={prevPage} /> : <Pagination.Prev />}
                        {offset < 900 ? <Pagination.Next onClick={nextPage} /> : <Pagination.Next />}
                    </Pagination>
            </Container>
        ) : null}


        </>
        
    )
}

export default WalletNfts