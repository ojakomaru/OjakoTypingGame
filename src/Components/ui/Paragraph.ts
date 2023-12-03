import styled from "styled-components";

const Paragraph = styled.p.attrs((props) => ({
  ref: props.ref,
  className: props.className,
  id: props.id,
}))`
  font-size: 1.2rem;
  color: #2d0303;
  line-height: 1.3;
  letter-spacing: 0.5px;
  margin: 0.6rem 0 0;
`;

export default Paragraph;
