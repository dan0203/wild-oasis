import PropTypes from 'prop-types';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const { id: cabinId, name, maxCapacity, regularPrice, discount, description, image } = cabin;

    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { isCreating, createCabin } = useCreateCabin();

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            description,
            image,
        });
    }

    return (
        <Table.Row>
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
            <div>
                <button onClick={handleDuplicate} disabled={isCreating}>
                    <HiSquare2Stack />
                </button>

                <Modal>
                    <Modal.Open opens="edit">
                        <button>
                            <HiPencil />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="edit">
                        <CreateCabinForm cabinToUpdate={cabin} />
                    </Modal.Window>

                    <Modal.Open opens="delete">
                        <button>
                            <HiTrash />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="delete">
                        <ConfirmDelete resourceName="cabin" disabled={isDeleting} onConfirm={() => deleteCabin(cabinId)} />
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>
    );
}

CabinRow.propTypes = {
    cabin: PropTypes.object,
    cabinId: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string,
};

export default CabinRow;
