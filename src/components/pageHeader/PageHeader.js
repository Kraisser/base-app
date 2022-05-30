import './pageHeader.css';

import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Clock from '../Clock/Clock';

import userIcon from '../../assets/icons/user-icon.png';

export default function PageHeader({auth}) {
	const navigate = useNavigate();

	const {userName, userImage} = useSelector((state) => state.auth);

	return (
		<header className='header'>
			<Link to='/'>
				<div className='mainHeader'>
					<h1>Картотека</h1>
				</div>
			</Link>
			<div className='clockWrapper'>
				<Clock />
			</div>
			{auth === false ? null : (
				<div className='userAuthIconWrapper' onClick={() => navigate('/userPage')}>
					<img src={userImage ? userImage : userIcon} alt='user' />
					<div title={userName ? userName : null}>{userName}</div>
				</div>
			)}
		</header>
	);
}
