import { ThreeDots } from 'react-loader-spinner';

export const loaderService = {
  threeDots: (
    <div className="loading-container">
      <div className="loader-wrapper">
        <ThreeDots
          height={80} /* Specify the desired height */
          width={80} /* Specify the desired width */
          radius={9}
          color="#535353"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    </div>
  ),
};
