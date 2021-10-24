
import { logger } from './logger.js';
import { getListOfMessages, addMessage, getMessageById, deleteMessageById } from './bl.js';
import { Router as expressRouter } from 'express';


export const router = expressRouter();

router.get('/', async (req, res) => {
    try {
            let get_ = await getListOfMessages(req.query.fromName, req.query.toName, req.query.createdAt, req.query.order, (err, res) => {
            let listMessages;
            listMessages = res;
            if (err) {
                logger.error(err)
                res.status(400).send(err.message);
            }
            else {
                return listMessages;
            }

        })

        res.status(200).send(get_.rows);

    }
    catch (err) {
        res.status(500).send(err.message);
        logger.error(err);
    }
})
/*** */

    router.post('/', async(req, res) => {
    try {
        if (!req.query.fromName || !req.query.toName || !req.query.message) {
            logger.error('Required fields were not fully entered');
            return res.status(400).send('Required fields were not fully entered');
        }
        if (req.query.fromName > 200 || req.query.toName > 200) {
            logger.error('The fields are too long')
            return res.status(400).send('The fields are too long')
        }
        let post_ = await addMessage(req.query.fromName, req.query.toName, req.query.message, (res, err) => {
        let statusPost = res;
        if (err) {
            logger.error(err);
            res.status(400).send(err.message);
        }
        else {
            return statusPost;
        }
    });
        logger.info(post_);
        res.status(200).send(post_);
    }
    catch(err) {
        res.status(500).send(err.message);
        logger.error(err);
    }
})




//export default router;
router.get('/:id', async(req, res) => {//export default  getController =
    try {
            let get_id = await getMessageById(req.params.id, (res, err) => {
            let message = res;
            if(err){
                logger.error(err);
                res.status(400).send(err.message);
            }
            else {
                return message;
            }
        });
        logger.info(get_id);
        res.status(200).send(get_id);
    }
    catch (err) {
        res.status(500).send(err.message);
        logger.error(err);
    }
})



router.delete('/:id', async (req, res) => {
    try {
        let deletemessage = await deleteMessageById(req.params.id, (res, err) => {
        let statusDelete = res;
        if(err){
            logger.error(err);
            res.status(400).send(err.message);
        }
        else {
            return statusDelete;
        }
        });

        logger.info(deletemessage);
        res.status(200).send(deletemessage);

    }
    catch (err) {
        res.status(500).send(err.message);
        logger.error(err)
    }
}); 