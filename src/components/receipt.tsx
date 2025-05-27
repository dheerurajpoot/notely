import { formatCurrency, formatDate } from "@/lib/utils";

export function Receipt({ order }: { order: any }) {
	const buyer = order.buyerId;
	const seller = order.sellerId;
	const product = order.productId;

	return (
		<div className='p-6 border rounded-lg max-w-2xl mx-auto'>
			<div className='flex justify-between items-center border-b pb-4 mb-6'>
				<div>
					<h2 className='text-xl font-bold'>Notely</h2>
					<p className='text-sm text-muted-foreground'>
						Student Marketplace
					</p>
				</div>
				<div className='text-right'>
					<h3 className='font-medium'>RECEIPT</h3>
					<p className='text-sm'>#{order._id.slice(0, 8)}</p>
					<p className='text-xs text-muted-foreground'>
						{formatDate(order.createdAt)}
					</p>
				</div>
			</div>

			<div className='grid md:grid-cols-2 gap-6 mb-6'>
				<div>
					<h4 className='font-medium mb-2'>Bill To:</h4>
					<div className='text-sm'>
						<p>{buyer?.name || `Customer #${order.buyerId}`}</p>
						<p>{buyer?.email || "No email available"}</p>
						{buyer?.university && <p>{buyer.university}</p>}
					</div>
				</div>

				<div>
					<h4 className='font-medium mb-2'>Seller:</h4>
					<div className='text-sm'>
						<p>{seller?.name || `Seller #${order.sellerId}`}</p>
						{seller?.email && <p>{seller.email}</p>}
					</div>
				</div>
			</div>

			<div className='border rounded mb-6'>
				<table className='w-full'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-4 py-2 text-left text-sm font-medium'>
								Item
							</th>
							<th className='px-4 py-2 text-right text-sm font-medium'>
								Price
							</th>
						</tr>
					</thead>
					<tbody className='divide-y'>
						<tr>
							<td className='px-4 py-3'>
								<div>
									<p className='font-medium'>
										{product?.title ||
											`Product #${order.productId}`}
									</p>
									<p className='text-sm text-muted-foreground'>
										Digital copy
									</p>
								</div>
							</td>
							<td className='px-4 py-3 text-right'>
								{formatCurrency(order.amount)}
							</td>
						</tr>
					</tbody>
					<tfoot className='bg-gray-50'>
						<tr>
							<td className='px-4 py-2 text-right font-medium'>
								Total
							</td>
							<td className='px-4 py-2 text-right font-medium'>
								{formatCurrency(order.amount)}
							</td>
						</tr>
					</tfoot>
				</table>
			</div>

			<div className='mb-6'>
				<h4 className='font-medium mb-2'>Payment Information:</h4>
				<div className='text-sm'>
					<p>
						<span className='font-medium'>Date:</span>{" "}
						{formatDate(order.createdAt)}
					</p>
					<p>
						<span className='font-medium'>Payment ID:</span>{" "}
						{order.paymentId || "N/A"}
					</p>
					<p>
						<span className='font-medium'>Status:</span>{" "}
						{order.status.charAt(0).toUpperCase() +
							order.status.slice(1)}
					</p>
				</div>
			</div>

			<div className='text-center text-sm text-muted-foreground border-t pt-4'>
				<p>Thank you for your purchase!</p>
				<p>
					If you have any questions, please contact support@notely.in
				</p>
			</div>
		</div>
	);
}
