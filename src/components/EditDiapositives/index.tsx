import React, { useState, useEffect } from "react";
import { CajaTexto, Guardar, Texto } from "../EditCurseData/EditCurseData.styles";
import {
    CrossDiv, Container, RadioContainer, FirstContainer, Cross, RadioButton,
    URLinput, BlockContainer, Pregunta, Respuesta, AnswersContainer, ArrowLeft, ArrowRight, ButtonContainer
} from "./EditDiapositives.styles";
import Header from "../HeaderUser";
import CrossIMG from "../../images/Cross.svg"
import ArrowLeftIMG from '../../images/ArrowLeft.png';
import ArrowRightIMG from '../../images/ArrowRigth.png';
import EditCurseData from "../EditCurseData";

interface newSlide{
    texto: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
}

const EditDiapositives = () => {
    //Hooks para tipo de diapositiva
    const [isTextoShown, setTextoShown] = useState(false);
    const [isVideoShown, setVideoShown] = useState(false);
    const [isPreguntaShown, setPreguntaShown] = useState(false);

    const [returnScreen, setReturnScreen] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    //Hook para mostrar el boton
    const [showButton, setShowButton] = useState(false);
    //Hooks para obtener los datos ingresados para el slide
    const [textoSlide, setTextoSlide] = useState("");
    const [array, setArray] = useState<any>([]);
    const [ans1, setAns1] = useState('');
    const [ans2, setAns2] = useState('');
    const [ans3, setAns3] = useState('');
    const [ans4, setAns4] = useState('');
    const [correctAns, setCorrectAns] = useState(0);

    const handleOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.checked;
        const name = e.currentTarget.id;

        if (value === true && name === "texto") {
            setTextoShown(true);
            setVideoShown(false);
            setPreguntaShown(false);
            setShowButton(true);
        }
        if (value === true && name === "video") {
            setTextoShown(false);
            setVideoShown(true);
            setPreguntaShown(false);
            setShowButton(true);
        }
        if (value == true && name === "pregunta") {
            setTextoShown(false);
            setVideoShown(false);
            setPreguntaShown(true);
            setShowButton(true);
        }
    }

    const handleCorrectAns = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.checked;
        const name = e.currentTarget.id;

        if(value === true && name ==='a'){
            setCorrectAns(1);
        }
        if(value === true && name ==='b'){
            setCorrectAns(2);
        }
        if(value === true && name ==='c'){
            setCorrectAns(3);
        }
        if(value === true && name ==='d'){
            setCorrectAns(4);
        }
    }

    const addSlide = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const slide: newSlide = {
            texto: textoSlide,
            answer1: ans1,
            answer2: ans2,
            answer3: ans3,
            answer4: ans4,
            correctAnswer: correctAns,
        };
        setArray([...array, slide]);
    }

    useEffect(() => {
        console.log(array);
        }, [array]);

    const modifySlideNumber = (name: string) => {
        if(name === 'left'){
            setSlideNumber(slideNumber - 1);
        }
        if(name === 'right'){
            setSlideNumber(slideNumber + 1);
        }
    }

    const handlePassScreen = (e: React.MouseEvent<HTMLImageElement>) => {
        const name = e.currentTarget.alt;
        modifySlideNumber(name);
        if(slideNumber >= 0){
            setReturnScreen(false);

        } else{
            setReturnScreen(true);
        }
    }

    return (
        <>
        {returnScreen ? <EditCurseData/> : 
            <>
                <Header />
                <CrossDiv>
                    <Cross src={CrossIMG} />
                </CrossDiv>

                <FirstContainer>
                    <RadioContainer>
                        <RadioButton type="radio" name="option" value="texto" id="texto" onChange={handleOptions} />
                        <label htmlFor="texto">Texto</label>
                    </RadioContainer>

                    <RadioContainer>
                        <RadioButton type="radio" name="option" value="video" id="video" onChange={handleOptions} />
                        <label htmlFor="video">Video</label>
                    </RadioContainer>

                    <RadioContainer>
                        <RadioButton type="radio" name="option" value="pregunta" id="pregunta" onChange={handleOptions} />
                        <label htmlFor="pregunta">Pregunta</label>
                    </RadioContainer>
                </FirstContainer>
                <form onSubmit={addSlide} >
                    <Container>
                        <ArrowLeft src={ArrowLeftIMG} alt="left" onClick={handlePassScreen} />
                        <ArrowRight src={ArrowRightIMG} alt="right"  onClick={handlePassScreen} />
                        {isTextoShown ?
                            <FirstContainer>
                                <CajaTexto
                                    name="texto"
                                    placeholder="Ingresa aquí tu texto"
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setTextoSlide(e.target.value) }}
                                    value={textoSlide}
                                />
                            </FirstContainer> : <></>}
                        {isVideoShown ?
                            <>
                                <BlockContainer>
                                    <Texto>Inserta la liga del video</Texto>
                                    <FirstContainer>
                                        <URLinput
                                            type="url"
                                            name="url"
                                            id="url"
                                            placeholder="https://example.com"
                                            pattern="https://.*"
                                            size={30}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTextoSlide(e.target.value) }}
                                            value={textoSlide}
                                        />
                                    </FirstContainer>
                                </BlockContainer>
                            </> : <></>}
                        {isPreguntaShown ?
                            <>
                                <FirstContainer>
                                    <Pregunta
                                        type="text"
                                        placeholder="Escribe aquí la pregunta"
                                        name="insertPregunta"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTextoSlide(e.target.value) }}
                                        value={textoSlide}
                                    />
                                </FirstContainer>
                                <AnswersContainer>
                                    <RadioContainer>
                                        <RadioButton type="radio" name="option2" value="a" id="a" onChange={handleCorrectAns} />
                                        <Respuesta
                                            type="text"
                                            name="a"
                                            placeholder="Respuesta"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAns1(e.target.value) }}
                                            value={ans1}
                                        />
                                    </RadioContainer>

                                    <RadioContainer>
                                        <RadioButton type="radio" name="option2" value="b" id="b" onChange={handleCorrectAns}  />
                                        <Respuesta
                                            type="text"
                                            name="b"
                                            placeholder="Respuesta"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAns2(e.target.value) }}
                                            value={ans2}
                                        />
                                    </RadioContainer>

                                    <RadioContainer>
                                        <RadioButton type="radio" name="option2" value="c" id="c" onChange={handleCorrectAns} />
                                        <Respuesta
                                            type="text"
                                            name="b"
                                            placeholder="Respuesta"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAns3(e.target.value) }}
                                            value={ans3}
                                        />
                                    </RadioContainer>

                                    <RadioContainer>
                                        <RadioButton type="radio" name="option2" value="d" id="d" onChange={handleCorrectAns} />
                                        <Respuesta
                                            type="text"
                                            name="b"
                                            placeholder="Respuesta"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAns4(e.target.value) }}
                                            value={ans4}
                                        />
                                    </RadioContainer>
                                </AnswersContainer>
                            </> : <></>}

                    </Container>

                    {showButton ?
                        <ButtonContainer>
                            <Guardar type="submit">GUARDAR</Guardar>
                        </ButtonContainer>
                        : <></>}
                </form>
            </>
        }
            

        </>
    )
}

export default EditDiapositives;