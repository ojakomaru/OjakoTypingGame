import styled from "styled-components";

const Paragraph = styled.p.attrs((props) => ({
  ref: props.ref,
  className: props.className,
  id: "checkText" || "questionText" || "hiraganaText" || "",
}))`
  font-size: 1rem;
  line-height: 1.3;
  margin: 1rem 0 0;
`;

export default Paragraph;
