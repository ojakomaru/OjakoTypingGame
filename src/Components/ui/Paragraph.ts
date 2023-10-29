import styled from "styled-components";

const Paragraph = styled.p.attrs((props) => ({
  ref: props.ref,
  className: props.className,
  id: props.id,
}))`
  font-size: 1rem;
  line-height: 1.3;
  margin: 0.6rem 0 0;
`;

export default Paragraph;
