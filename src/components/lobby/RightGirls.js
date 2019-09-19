import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

const RightGirls = ({selectedGirl, api, changeGirl}) => {
    
    return (
        <div className="right-girls">
            {
                api.map(({ key, imgSrc, name }) => {

                    return (
                        <div onClick={changeGirl} key={key} className={`image`}>
                            <img className={selectedGirl===key? "selected":""} name={name} src={imgSrc} alt="" />
                        </div>
                    )
                })
            }
        </div>
    )
}
RightGirls.propTypes={
    api: PropTypes.array,
}

const mapStateToProps = (state) => {
    const {api} = state.game
    return {
        api
    }
}
export default connect(mapStateToProps)(RightGirls)
