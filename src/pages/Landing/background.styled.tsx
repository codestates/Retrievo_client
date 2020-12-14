import styled from "@emotion/styled";

export const BackgroundShapePupple = styled.div`
  clip-path: polygon(50% 0%, 100% 0%, 100% 50%);
  width: 100%;
  height: 100%;
  background-color: #67499e;
  position: absolute;
  top: 0;
`;

export const BackgroundShapeTeal = styled.div`
  clip-path: polygon(100% 10%, 100% 100%, 30% 100%);
  width: 100%;
  height: 100%;
  background-color: #31d5bf;
  position: absolute;
  top: 0;
`;

export const BackgroundShape = styled.div`
  background-image: src("../../asset/img/shapes11.png");
  width: 100%;
  height: 50%;
`;
