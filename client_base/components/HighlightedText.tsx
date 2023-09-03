import { Typography } from "antd";
import { Fragment } from "react";

const { Text } = Typography;

const HighlightedText = (props: {
  text: string;
  highlightWords?: string[];
}) => {
  // Tạo biểu thức chính quy để tìm kiếm các từ cần highlight
  const regex = props.highlightWords
    ? new RegExp(`\(${props.highlightWords.join("|")}\)`)
    : undefined;

  let highlightedText = [<Text> {props.text} </Text>];
  if (regex) {
    // Phân tách văn bản thành các phần tử chứa các từ riêng lẻ
    const parts = props.text?.split(regex) ?? [];
    // Render các phần tử văn bản với từ được highlight bằng cách sử dụng component Text của antd
    highlightedText = parts.map((part, index) => {
      return (
        <Text
          key={index}
          mark={props.highlightWords?.includes(part)}
          style={{
            whiteSpace: "pre",
          }}
        >
          {`${part}`}
        </Text>
      );
    });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {highlightedText.map((item, idx) => (
        <Fragment key={idx}>{item}</Fragment>
      ))}
    </div>
  );
};

export default HighlightedText;