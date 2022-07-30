import { useEffect, useState } from 'react';
import { 
    Container, 
    ListaRepo, 
    ContainerLista, 
    Informacoes,
    ParagrafosInfo,
    LinhaInfos,
    TopicosLinha,
    Topicos,
    DivInput,
    Button,
    Input,
    ParagrafosDesc,
    RepositorioImg,
    ContainerLinguagem,
    ContadorPaginacao
} from './style'
import { GoRepo } from 'react-icons/go';
import {FaRegStar, FaRegCircle} from 'react-icons/fa'


const Home = () => {
    const [paginacaoRepositorio, setPaginacaoRepositorio] = useState([])
    const [linguagem, setLinguagem] = useState('node')
    const [linguagemTemp, setLinguagemTemp] = useState('')
    const [pagina, setPagina] = useState(1)
    const [sobreLinguagem, setSobreLinguagem] = useState([])

    useEffect(() => {
        fetch(`https://api.github.com/search/repositories?q=${linguagem}&page=${pagina}&per_page=10`)
        .then(response => response.json())
        .then(data => {
            setPaginacaoRepositorio(data.items)
        })

    }, [linguagem, pagina])

    useEffect(() => {
        fetch(`https://api.github.com/search/topics?q=${linguagem}&per_page=1`)
        .then(response => response.json())
        .then(data => {
            setSobreLinguagem(data.items)

        })
    }, [linguagem])
  


    const atualizaPesquisa = () => {
        setLinguagem(linguagemTemp)
        setLinguagemTemp('')
        setPagina(1)
    }

    const retornoLinguagem =(linguagem) => {
        if(linguagem === null){
            return(
                <></>
            )
        }else{
            return(
                <div>
                    <FaRegCircle/>
                    <p>
                    {linguagem}
                    </p>
                </div>
            )
        }
    }

    const paginaAnterior = () => {
        if(pagina > 1){
            setPagina(pagina - 1)

        }

    }

    const proximaPagina = () => {
        if(pagina >= 1 && paginacaoRepositorio.length >= 10){
            setPagina(pagina + 1);
        }
    }


    return ( 

    <Container>
        <h1>Repositórios</h1>
        <DivInput>
            <Input type="text" onChange={(e) => setLinguagemTemp(e.target.value)} placeholder="Digite a tecnologia"
                value={linguagemTemp} ></Input>
            <Button onClick={atualizaPesquisa} >Pesquisar</Button>
        </DivInput>

        <ListaRepo>
            <ContainerLinguagem>
                {
                    sobreLinguagem.map(sobre => {
                        return(
                            <div>
                                <h1>
                                {sobre.name}
                            </h1>
                            <p>
                                {sobre.short_description}
                            </p>
                            </div>
                        )
                    })
                }

            </ContainerLinguagem>
                
            {paginacaoRepositorio.map(repo => {
                return(
                    
                    <ContainerLista key={repo.id}> 
                        <RepositorioImg>

                        <GoRepo/>
                        </RepositorioImg>


                        <Informacoes>
                            <a href={repo.url}>
                               <h2>{repo.full_name}</h2>
                            </a>
                            <ParagrafosDesc> 
                                {repo.description}
                            </ParagrafosDesc>

                            <TopicosLinha>
                                {repo.topics.map(rep =>{
                                    return(
                                        <Topicos>
                                            <a href={`https://github.com/topics/${rep}`}>
                                                <p>{rep}</p>
                                            </a>
                                        </Topicos>
                                    )
                                })}

                            </TopicosLinha>

                            <LinhaInfos>

                                <ParagrafosInfo> 
                                    <div>
                                        <FaRegStar/>
                                        <p>

                                            {repo.watchers}
                                        </p>
                                    </div>
                                    {retornoLinguagem(repo.language)}
                                </ParagrafosInfo>

                            </LinhaInfos>
                            
                        </Informacoes>



                    </ContainerLista>

                )
            })}
        </ListaRepo>
        <ContadorPaginacao>
            <Button onClick={paginaAnterior} >Anterior</Button>

            <Button onClick={proximaPagina}>Proxima</Button>
        </ContadorPaginacao>
    </Container>
    );
}

export default Home;