import React, { createContext, useContext, useState } from "react";
import { ChakraProvider, Box, Button, Flex, Heading } from "@chakra-ui/react";

const GameContext = createContext();

function useGame() {
    return useContext(GameContext);
}

function Board() {
    const { squares, nextValue, winner, selectSquare, restart } = useGame();
    const status = calculateStatus(winner, squares, nextValue);

    function renderSquare(i) {
        return (
            <Button
                bg="#E9BCB9"
                p="2"
                className="square"
                onClick={() => selectSquare(i)}
            >
                {squares[i]}
            </Button>
        );
    }

    return (
        <Box
            align="center"
            bg="#65254A"
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Flex
                direction="column"
                align="center"
                bg="#F19F5D"
                p="8"
                borderRadius="md"
                boxShadow="md"
            >
                <Heading size="lg" mb="4" color="#65254A">
                    Tic Tac Toe Games
                </Heading>
                <Heading size="md" mb="4" color="#65254A">
                    {status}
                </Heading>

                <Flex direction="row">
                    <Flex p="2">{renderSquare(0)}</Flex>
                    <Flex p="2">{renderSquare(1)}</Flex>
                    <Flex p="2">{renderSquare(2)}</Flex>
                </Flex>
                <Flex direction="row">
                    <Flex p="2">{renderSquare(3)}</Flex>
                    <Flex p="2">{renderSquare(4)}</Flex>
                    <Flex p="2">{renderSquare(5)}</Flex>
                </Flex>
                <Flex direction="row">
                    <Flex p="2">{renderSquare(6)}</Flex>
                    <Flex p="2">{renderSquare(7)}</Flex>
                    <Flex p="2">{renderSquare(8)}</Flex>
                </Flex>

                <Button
                    mt="4"
                    bg="#AE455B"
                    color="white"
                    _hover={{
                        bg: "#632348",
                    }}
                    onClick={restart}
                >
                    Restart
                </Button>
            </Flex>
        </Box>
    );
}

function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const nextValue = calculateNextValue(squares);
    const winner = calculateWinner(squares);

    function selectSquare(square) {
        if (squares[square] || winner) {
            return;
        }

        const newSquares = squares.slice();
        newSquares[square] = nextValue;
        setSquares(newSquares);
    }

    function restart() {
        setSquares(Array(9).fill(null));
    }

    const gameData = {
        squares,
        nextValue,
        winner,
        selectSquare,
        restart,
    };

    return (
        <div>
            <GameContext.Provider value={gameData}>
                <Board />
            </GameContext.Provider>
        </div>
    );
}

function calculateStatus(winner, squares, nextValue) {
    return winner
        ? `Winner: ${winner}`
        : squares.every(Boolean)
        ? `Game Draw!!`
        : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

function App() {
    return (
        <ChakraProvider>
            <Game />
        </ChakraProvider>
    );
}

export default App;
