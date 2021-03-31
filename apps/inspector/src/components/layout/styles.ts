import styled from 'styled-components';

export const StyledLoadingOverlay = styled.div<{ show: boolean }>`
  z-index: 1;
  position: absolute;
  top: 22px;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  background: #ffffff60;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

export const StyledLinearLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 8px;
  background: #b3d6eb;
  overflow: hidden;
`;

export const StyledSlider = styled.div`
  @keyframes slide {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(300%);
    }
  }
  width: 30%;
  height: 8px;
  background: linear-gradient(90deg, transparent 0%, #2f78a1 50%, transparent 100%);
  animation: slide linear 2000ms infinite;
`;

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  /* padding-top: 22px; */
`;

export const StyledLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 100%;
  border-right: solid 1px #00000040;
`;

export const StyledInjectedFilter = styled.div`
  display: flex;
  flex-direction: row;
  height: 30%;
  min-height: 30%;
  border-bottom: solid 1px #00000040;
`;

export const StyledTypeSearch = styled.div`
  display: flex;
  flex-direction: row;
  height: 70%;
`;

export const StyledRightPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;

export const StyledFilter = styled.div`
  display: flex;
  flex-direction: row;
  height: 4rem;
  border-bottom: solid 1px #00000040;
`;

export const StyledWorkspace = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  flex-grow: 1;
`;

export const StyledOverview = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 0;
  height: 100%;
`;

export const StyledDetail = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 0;
  height: 100%;
  max-width: 50%;
  border-left: solid 1px #00000040;
`;
