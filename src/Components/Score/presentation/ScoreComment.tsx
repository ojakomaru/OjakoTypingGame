import styled from 'styled-components';

const StyledScoreComment = styled.div`
  border-top: 1px solid #333;
  position: relative;
  left: 10px;
  top: 238px;
  margin-left: 10px;
  width: 500px;
  padding: 0 5px;
  font-size: 16px;
`;
const ScoreComment = ({ comment }: { comment: string }) => <StyledScoreComment>{comment}</StyledScoreComment>;

export default ScoreComment;
