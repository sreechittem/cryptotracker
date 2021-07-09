const form = document.querySelector('#searchForm');
const res= document.querySelector('#tabRes');
var ref;
form.addEventListener('submit',(e)=>{
	e.preventDefault();
	if(ref){
		clearTimeout(ref);
	}
	const ctype=form.elements.coinType.value;
	fetchPrice(ctype);
});
const fetchPrice= async(ctype)=>{
	const r=await axios.get(`https://api.cryptonator.com/api/ticker/${ctype}`);
	const base=r.data.ticker.base;
	const target=r.data.ticker.target;
	const price=r.data.ticker.price;
	const volume=r.data.ticker.volume;
	const change=r.data.ticker.change;
	const tstamp=r.data.timestamp;
	res.innerHTML=`<thead class="thead-dark bg-warning font-weight-700">
				<th class="p-3">
					Property
				</th>
				<th>
					Value
				</th>
			</thead>
			<tbody class="bg-secondary text-white">
				<tr>
					<td>
						${base}
					</td>
					<td class="p-2">
						${price} ${target}
					</td>
				</tr>
				<tr>
					<td class="p-2">
						Volume
					</td>
					<td>
						${volume}
					</td>
				</tr>
				<tr>
					<td class="p-2">
						Change
					</td>
					<td>
						${change}
					</td>
				</tr>
				<tr>
					<td class="p-2">
						Last Update Time
					</td>
					<td>
						${tstamp}
					</td>
				</tr>
			</tbody>`
			ref=setTimeout(()=>fetchPrice(ctype),10000);
}

