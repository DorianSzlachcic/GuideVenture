import React, { useState, useEffect } from "react";
import { View, Image, PanResponder, Animated, Dimensions } from "react-native";

const Puzzle = ({ imageUri, rows, cols, onSolved }) => {
  const [pieces, setPieces] = useState([]);
  const [solved, setSolved] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    Image.getSize(
      imageUri,
      (width, height) => {
        setImageDimensions({ width: width, height: height });
        const pieceWidth = width / cols;
        const pieceHeight = height / rows;

        const newPieces = [];
        for (let i = 0; i < rows * cols; i++) {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const x = col * pieceWidth;
          const y = row * pieceHeight;
          newPieces.push({ index: i, x, y });
        }
        setPieces(newPieces);
      },
      (error) => console.error("Failed to get image size:", error)
    );
  }, [imageUri, rows, cols]);

  const handlePieceDrop = (index, x, y) => {
    const targetX =
      Math.floor(x / (imageDimensions.width / cols)) *
      (imageDimensions.width / cols);
    const targetY =
      Math.floor(y / (imageDimensions.height / rows)) *
      (imageDimensions.height / rows);

    const newPieces = [...pieces];
    const movedPiece = newPieces.find((piece) => piece.index === index);
    const emptyPiece = newPieces.find(
      (piece) => piece.index === rows * cols - 1
    );

    movedPiece.x = targetX;
    movedPiece.y = targetY;

    if (targetX === emptyPiece.x && targetY === emptyPiece.y) {
      checkIfSolved(newPieces);
    }

    setPieces(newPieces);
  };

  const checkIfSolved = (newPieces) => {
    const solved = newPieces.every((piece, index) => piece.index === index);
    if (solved) {
      setSolved(true);
      onSolved();
    }
  };

  const renderPuzzlePieces = () => {
    return pieces.map((piece) => {
      return (
        <Animated.View
          key={piece.index}
          style={{
            position: "absolute",
            width: imageDimensions.width / cols,
            height: imageDimensions.height / rows,
            transform: [{ translateX: piece.x }, { translateY: piece.y }],
          }}
          {...panResponder.panHandlers}
        >
          <Image
            source={{ uri: imageUri }}
            style={{
              width: imageDimensions.width,
              height: imageDimensions.height,
              marginLeft: -piece.x,
              marginTop: -piece.y,
            }}
          />
        </Animated.View>
      );
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      const { dx, dy } = gesture;
      // Move the piece being dragged
      // ...
    },
    onPanResponderRelease: (_, gesture) => {
      const { index, x, y } = gesture;
      handlePieceDrop(index, x, y);
    },
  });

  return (
    <View
      style={{ width: imageDimensions.width, height: imageDimensions.height }}
    >
      {renderPuzzlePieces()}
    </View>
  );
};

export default Puzzle;
