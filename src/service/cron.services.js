import cron from 'node-cron';
import loanRepository from '../repositories/loan.repositories.js';
import moment from 'moment';
import sendEmail from './email.services.js';

cron.schedule('37 0 * * *', async () => {
    const loans = await loanRepository.findAllLoansRepository();
    const today = moment().startOf('day');

    loans.forEach(async (loan) => {
        const dueDate = moment(loan.dueDate).startOf('day');
        const reminderDueDate = moment(dueDate).subtract(1, 'days');
        if(today.isSame(reminderDueDate)){
            sendEmail(loan.email, loan.username, loan.title, loan.dueDate)
        }
    });
});