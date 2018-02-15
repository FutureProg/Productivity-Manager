import React from 'react';
import { storiesOf } from '@storybook/react';

import CompletedTasksModal from '../components/modals/CompletedTasksModal.tsx';

storiesOf('Modals',module).add('Completed Task Modal',()=>
	<CompletedTasksModal/>
);