import '../../css/formPage.css';
import '../../css/common.css';

import {Link} from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';
import EditCardHoc from '../../components/EditCardHoc/EditCardHoc';

export default function AddCardPage() {
	return (
		<>
			<PageHeader burger={false} />
			<main>
				<div className='formWrapper'>
					<EditCardHoc />
					<div>
						<Link to='/'>
							<button className='onMainBut but'>на главную</button>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}
