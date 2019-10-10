var documenterSearchIndex = {"docs":
[{"location":"detail/#Additional-Detail-1","page":"Detail","title":"Additional Detail","text":"","category":"section"},{"location":"detail/#","page":"Detail","title":"Detail","text":"Functions like GridSpec(\"LLC90\") return a gcmgrid struct that contains the basic specification of a global grid. This is not the grid itself – just a few parameters, ranges, and possibly a path to grid files. A gcmgrid is embeded in each MeshArray instance for which it provides a blueprint. It specifies how an array collection forms a global mesh and allows e.g. the exchange function to dispatch to the appropriate method. ","category":"page"},{"location":"detail/#","page":"Detail","title":"Detail","text":"Various configurations that are commonly used in Earth System Models are readily implemented using the concrete type called MeshArray. This type is in fact an alias for more specific types that can be used interchangeably via MeshArray (initially: gcmfaces or gcmarray).","category":"page"},{"location":"detail/#","page":"Detail","title":"Detail","text":"Within a MeshArray, a whole Earth System Model grid is represented as an array of elementary arrays. Each one of these represents a subdomain. For example, a gcmarray instance for one Earth map x has a column array x.f of elementary 2D arrays of various sizes. MeshArrays.demo1 illustrates how one easily operates MeshArray structs via standard and specialized functions. In brief, a MeshArray should be used just like a common Array.","category":"page"},{"location":"detail/#","page":"Detail","title":"Detail","text":"Background: MeshArrays.jl is rooted in a Matlab / Octave package called gcmfaces, which was introduced in Forget et al., 2015 (doi:10.5194/gmd-8-3071-2015). GCM is an acronym for General Circulation Model, or Global Climate Model, and faces can mean meshes, arrays, facets, or subdomains (these are the elements of x.f in a MeshArray instance x).","category":"page"},{"location":"main/#Main-Features-1","page":"Main","title":"Main Features","text":"","category":"section"},{"location":"main/#","page":"Main","title":"Main","text":"An instance of the MeshArray type has arrays as elements. Elementary arrays within a MeshArray may represent subdomains inter-connected at their edges. The organization and connections between subdomains is determined by a user-specified gcmgrid which is embeded in MeshArray instances. Exchange methods transfer data between neighboring arrays to extend computational subdomains – this is often needed in analyses of climate or ocean model output.","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"The current default for MeshArray is the gcmarray type and an instance H is shown below. This example is based on a grid known as LLC90 where each global map is associated with 5 subdomains. Hence, H.f is a (5, 50) array when H represents a gridded variable on 50 depth levels, and elements of  H.f are arrays of size (90, 270), (90, 90), or (270, 90). ","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"julia> show(D)\n gcmarray \n  grid type   = llc\n  data type   = Float64\n  tile array  = (5, 50)\n  tile sizes  = (90, 270)\n                (90, 270)\n                (90, 90)\n                (270, 90)\n                (270, 90)","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"The underlying, MeshArray, data structure is:","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"struct gcmarray{T, N} <: AbstractMeshArray{T, N}\n   grid::gcmgrid\n   f::Array{Array{T,2},N}\n   fSize::Array{NTuple{2, Int}}\n   fIndex::Array{Int,1}\nend","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"A MeshArray generally behaves just like an Array including for operations listed below. The broadcasting function has been customized so that it reaches elements of each elementary array.","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"size(D)\neltype(D)\nview(D,:)\n\nD .* 1.0\nD .* D\n1000*D\nD*1000\n\nD[findall(D .> 300.)] .= NaN\nD[findall(D .< 1.)] .= NaN\n\nD[1]=0.0 .+ D[1]\ntmp=cos.(D)","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"In addition, Mesharray specific functions like exchange cano alter the internal structure of a MeshArray. Elementary array sizes are thus larger in show(exchange(D)) than show(D).","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"julia> show(exchange(D))\ngcmarray \n  grid type   = llc\n  data type   = Float64\n  tile array  = (5,)\n  tile sizes  = (92, 272)\n                (92, 272)\n                (92, 92)\n                (272, 92)\n                (272, 92)","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"A MeshArray includes a gcmgrid specification which can be constructed as outlined below.","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"gcmgrid(path::String, class::String, nFaces::Int,\n        fSize::Array{NTuple{2, Int},1}, ioSize::Array{Int64,2},\n        ioPrec::Type, read::Function, write::Function)","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"Each gcmgrid includes a pair of read / write methods that allow for basic I/O that is typically specified by the user when the provided defaults are not adequate. ","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"An important aspect is that gcmgrid does not contain any actual grid variable – hence its memory footprint is minimal. Grid variables are instead read only when needed e.g. as shown below.","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"grid=GridSpec(\"LLC90\")\nD=grid.read(grid.path*\"Depth.data\",MeshArray(grid,Float64))","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"The JuliaCon-2018 presentation relied on two Jupyter notebooks that are available in the MeshArrayNotebooks repo. MeshArrays.demo1 and MeshArrays.demo2 are very similar. ","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"Standard oceanography examples are also provided in MeshArrayNotebooks (e.g., 04_transports.ipynb) and / or in MeshArrays.jl (e.g., demo3).","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"A simple way to plot a MeshArray consists in plotting each elementary array separately (see below). Other methods that e.g. produce global maps and projections are illustrated in the notebooks. ","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"p=dirname(pathof(MeshArrays));\nusing Plots; include(joinpath(p,\"Plots.jl\"));\nheatmap(D,title=\"Ocean Depth\",clims=(0.,6000.))","category":"page"},{"location":"main/#","page":"Main","title":"Main","text":"<img src=\"https://raw.githubusercontent.com/gaelforget/MeshArrays.jl/master/docs/images/ocean_depth.png\" title=\"Split Ocean Depth\" align=\"middle\" width=\"50%\"/>","category":"page"},{"location":"#MeshArrays.jl-documentation-1","page":"Home","title":"MeshArrays.jl documentation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"MeshArrays.jl is a Julia package. It defines an Array type for collections of inter-connected arrays, and extends standard methods to readily operate on these MeshArrays. Its exchange methods transfer data between connected subdomains of the overall mesh. ","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The internals of a MeshArray instance are regulated by index ranges, array sizes, and inter-connections that are encoded as a gcmgrid struct. Such a computational framework is often useful in Earth System Modeling which can involve advanced domain decomposition methods (see below). ","category":"page"},{"location":"#","page":"Home","title":"Home","text":"MeshArrays.jl aims to provide a simple but versatile and powerful solution to this end. It was first introduced in this JuliaCon-2018 presentation as gcmfaces.jl (see this other repo for notebooks).","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Contents:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Pages = [\"index.md\",\"main.md\",\"detail.md\",\"API.md\"]\nDepth = 3","category":"page"},{"location":"#","page":"Home","title":"Home","text":"note: Note\nMeshArrays.jl is registered, documented, archived, and routinely tested, but also still regarded as a preliminary implementation.","category":"page"},{"location":"#Install-and-Test-1","page":"Home","title":"Install & Test","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"MeshArrays\")\nPkg.test(\"MeshArrays\")","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Julia's package manager is documented here within docs.julialang.org.","category":"page"},{"location":"#Use-Examples-1","page":"Home","title":"Use Examples","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"using MeshArrays\nGridVariables=GridOfOnes(\"cs\",6,100)\nDemoVariables=MeshArrays.demo2(GridVariables)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The above example integrates lateral diffusion over the surface of a cube. The overall grid has 6 subdomains with 100 x 100 grid points each and all grid scales set to 1.0. ","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Alternatively, we can download and use a pre-defined global ocean grid from the MITgcm community.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"git clone https://github.com/gaelforget/GRID_LLC90\nGridVariables=GridLoad(GridSpec(\"LLC90\"))\nDemoVariables= MeshArrays.demo2(GridVariables)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"This grid has 5 subdomains of uneven sizes (105300 grid points in total), variable grid scale factors, and a realistic representation of  continents. ","category":"page"},{"location":"#Model-Grid-Examples-1","page":"Home","title":"Model Grid Examples","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"<img src=\"https://raw.githubusercontent.com/gaelforget/MeshArrays.jl/master/docs/images/sphere_all.pdf\" title=\"Earth Model Grid Types\" align=\"middle\" width=\"50%\"/>","category":"page"},{"location":"API/#API-Guide-1","page":"API","title":"API Guide","text":"","category":"section"},{"location":"API/#","page":"API","title":"API","text":"","category":"page"},{"location":"API/#","page":"API","title":"API","text":"Modules = [MeshArrays]\nOrder   = [:type,:function]","category":"page"},{"location":"API/#MeshArrays.AbstractMeshArray","page":"API","title":"MeshArrays.AbstractMeshArray","text":"AbstractMeshArray{T, N}\n\nSubtype of AbstractArray{T, N}\n\n\n\n\n\n","category":"type"},{"location":"API/#MeshArrays.gcmgrid","page":"API","title":"MeshArrays.gcmgrid","text":"gcmgrid\n\ngcmgrid data structure. Available constructors:\n\ngcmgrid(path::String, class::String, nFaces::Int,\n        fSize::Array{NTuple{2, Int},1}, ioSize::Array{Int64,2},\n        ioPrec::Type, read::Function, write::Function)\n\n\n\n\n\n","category":"type"},{"location":"API/#MeshArrays.GridLoad-Tuple{gcmgrid}","page":"API","title":"MeshArrays.GridLoad","text":"GridLoad(mygrid::gcmgrid)\n\nReturn a Dict of grid variables read from files located in mygrid.path (see ?GridSpec).\n\nBased on the MITgcm naming convention, grid variables are:\n\nXC, XG, YC, YG, AngleCS, AngleSN, hFacC, hFacS, hFacW, Depth.\nRAC, RAW, RAS, RAZ, DXC, DXG, DYC, DYG.\nDRC, DRF, RC, RF (one-dimensional)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.GridOfOnes-Tuple{Any,Any,Any}","page":"API","title":"MeshArrays.GridOfOnes","text":"GridOfOnes(grTp,nF,nP)\n\nDefine all-ones grid variables instead of using GridSpec & GridLoad.\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.GridSpec","page":"API","title":"MeshArrays.GridSpec","text":"GridSpec(gridName)\n\nReturn a gmcgrid specification that provides grid files path, class, nFaces, ioSize, facesSize, ioPrec, & a read function (not yet) using hard-coded values for \"LLC90\", \"CS32\", \"LL360\" (for now).\n\n\n\n\n\n","category":"function"},{"location":"API/#MeshArrays.LatitudeCircles-Tuple{Any,Dict}","page":"API","title":"MeshArrays.LatitudeCircles","text":"LatitudeCircles(LatValues,GridVariables::Dict)\n\nCompute integration paths that follow latitude circles\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.ScalarPotential-Tuple{Any}","page":"API","title":"MeshArrays.ScalarPotential","text":"ScalarPotential(TrspCon)\n\nScalar potential inversion.\n\nTrspPot=ScalarPotential(TrspCon)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.ThroughFlow-Tuple{Any,Any,Dict}","page":"API","title":"MeshArrays.ThroughFlow","text":"ThroughFlow(VectorField,IntegralPath,GridVariables::Dict)\n\nCompute transport through an integration path\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.VectorPotential","page":"API","title":"MeshArrays.VectorPotential","text":"VectorPotential(TrspX,TrspY,GridVariables,method::Int=1)\n\nVector potential inversion.\n\nTrspPot=ScalarPotential(TrspCon)\n\n\n\n\n\n","category":"function"},{"location":"API/#MeshArrays.convergence-Tuple{MeshArrays.gcmarray,MeshArrays.gcmarray}","page":"API","title":"MeshArrays.convergence","text":"convergence(uFLD::MeshArray,vFLD::MeshArray)\n\nCompute convergence of a vector field\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.exchange-Tuple{MeshArrays.gcmarray}","page":"API","title":"MeshArrays.exchange","text":"exchange(fld::MeshArray)\n\nExchange / transfer data between neighboring arrays. Other methods are\n\nexchange(fld::MeshArray,N::Integer)\nexchange(u::MeshArray,v::MeshArray)\nexchange(u::MeshArray,v::MeshArray,N::Integer)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.findtiles-Tuple{Int64,Int64,gcmgrid}","page":"API","title":"MeshArrays.findtiles","text":"findtiles(ni::Int,nj::Int,mygrid::gcmgrid)\nfindtiles(ni::Int,nj::Int,grid::String=\"llc90\",gridParentDir=\"./\")\n\nReturn a MeshArray map of tile indices for tile size ni,nj\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.gradient-Tuple{MeshArrays.gcmarray,Dict}","page":"API","title":"MeshArrays.gradient","text":"gradient(inFLD::MeshArray,GridVariables::Dict)\n\nCompute spatial derivatives. Other methods:\n\ngradient(inFLD::MeshArray,GridVariables::Dict,doDIV::Bool)\ngradient(inFLD::MeshArray,iDXC::MeshArray,iDYC::MeshArray)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.mask-Tuple{MeshArrays.gcmarray,Number}","page":"API","title":"MeshArrays.mask","text":"mask(fld::MeshArray, val::Number)\n\nReplace non finite values with val. Other methods:\n\nmask(fld::MeshArray)\nmask(fld::MeshArray, val::Number, noval::Number)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.smooth-Tuple{MeshArrays.gcmarray,MeshArrays.gcmarray,MeshArrays.gcmarray,Dict}","page":"API","title":"MeshArrays.smooth","text":"smooth(FLD::MeshArray,DXCsm::MeshArray,DYCsm::MeshArray,GridVariables::Dict)\n\nSmooth out scales below DXCsm / DYCsm via diffusion\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.gcmarray","page":"API","title":"MeshArrays.gcmarray","text":"gcmarray{T, N}\n\ngcmarray data structure. Available constructors:\n\ngcmarray{T,N}(grid::gcmgrid,f::Array{Array{T,2},N},\n         fSize::Array{NTuple{N, Int}},fIndex::Array{Int,1})\n\ngcmarray(grid::gcmgrid,f::Array{Array{T,2},N}) where {T,N}\ngcmarray(grid::gcmgrid,f::Array{Array{T,N},1}) where {T,N}\n\ngcmarray(grid::gcmgrid,fSize::Array{NTuple{N, Int}},fIndex::Array{Int,1})\ngcmarray(<same as above>,n3::Int)\ngcmarray(<same as above>,n3::Int,n4::Int)\n\ngcmarray(grid::gcmgrid)\ngcmarray(grid::gcmgrid,::Type{T})\ngcmarray(grid::gcmgrid,::Type{T},n3::Int)\ngcmarray(grid::gcmgrid,::Type{T},n3::Int,n4::Int)\n\n\n\n\n\n","category":"type"},{"location":"API/#MeshArrays.gcmfaces","page":"API","title":"MeshArrays.gcmfaces","text":"gcmfaces{T, N}\n\ngcmfaces data structure. Available constructors:\n\ngcmfaces{T,N}(grid::gcmgrid,f::Array{Array{T,N},1},\n         fSize::Array{NTuple{N, Int}}, aSize::NTuple{N,Int})\n\ngcmfaces(grid::gcmgrid,v1::Array{Array{T,N},1}) where {T,N}\ngcmfaces(grid::gcmgrid,::Type{T},\n         fSize::Array{NTuple{N, Int}}, aSize::NTuple{N,Int}) where {T,N}\n\ngcmfaces(grid::gcmgrid)\ngcmfaces(grid::gcmgrid,::Type{T})\ngcmfaces(grid::gcmgrid,::Type{T},n3::Int)\n\n\n\n\n\n","category":"type"},{"location":"API/#MeshArrays.gcmsubset","page":"API","title":"MeshArrays.gcmsubset","text":"gcmsubset{T, N}\n\ngcmsubset data structure for subsets of gcmfaces. Available constructors:\n\ngcmsubset{T,N}(grid::gcmgrid,f::Array{Array{T,N},1},\n               fSize::Array{NTuple{N, Int}},aSize::NTuple{N, Int},\n               i::Array{Array{T,N},1},iSize::Array{NTuple{N, Int}})\ngcmsubset(grid::gcmgrid,::Type{T},fSize::Array{NTuple{N, Int}},\n          aSize::NTuple{N,Int},dims::NTuple{N,Int}) where {T,N}\n\n\n\n\n\n","category":"type"},{"location":"API/#MeshArrays.gcmvector","page":"API","title":"MeshArrays.gcmvector","text":"gcmvector{T, N}\n\ngcmvector data structure that can be used for   subsetting and indexing into a gcmarray.\n\ngcmvector{T,N}(grid::gcmgrid,f::Array{Array{T,1},N},\n         fSize::Array{NTuple{N, Int}},fIndex::Array{Int,1})\n\n\n\n\n\n\n","category":"type"},{"location":"API/#Base.findall-Union{Tuple{gcmarray{Bool,N}}, Tuple{N}} where N","page":"API","title":"Base.findall","text":"findall(A::gcmarray{Bool})\n\nReturn a gcmvector of the true indices in A. This allows:\n\nfindall(A.<0) #gcmvector of CartesianIndex{2}\nA[findall(A.<0)] #gcmvector of eltype(A)\nview(A,findall(A.<0)) #CatView of eltype(A)\n\nA[findall(A.<0)]=B[findall(A.<0)]\nA[findall(A.<0)].=view(B,findall(A.<0))\nA[findall(A.<0)].=NaN\n\n\n\n\n\n","category":"method"},{"location":"API/#Base.read-Tuple{String,MeshArrays.gcmarray}","page":"API","title":"Base.read","text":"read(fil::String,x::MeshArray)\n\nRead binary file to MeshArray. Other methods:\n\nread(xx::Array,x::MeshArray) #from Array\n\n\n\n\n\n","category":"method"},{"location":"API/#Base.write-Tuple{String,MeshArrays.gcmarray}","page":"API","title":"Base.write","text":"write(fil::String,x::MeshArray)\n\nWrite MeshArray to binary file. Other methods:\n\nwrite(xx::Array,x::MeshArray) #to Array\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.MapWetPoints-Tuple{Any}","page":"API","title":"MeshArrays.MapWetPoints","text":"MapWetPoints(mskWet)\n\nMapping from global array to global ocean vector.\n\n(Kvec,Lvec,Kmap,Lmap)=MapWetPoints(mskWet)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.MaskWetPoints-Tuple{Any}","page":"API","title":"MeshArrays.MaskWetPoints","text":"MaskWetPoints(TrspCon)\n\nMask land points with NaN.\n\n(TrspCon, mskWet, mskDry)=MaskWetPoints(TrspCon)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.MatrixForPoisson-NTuple{7,Any}","page":"API","title":"MeshArrays.MatrixForPoisson","text":"MatrixForPoisson(TrspCon,mskWet,mskDry,Kvec,Lvec,Kmap,Lmap)\n\nAssemble sparse matrix using mskWet, Kvec, Lvec directly and Kmap, Lmap via SeedWetPoints\n\nA=MatrixForPoisson(TrspCon,mskWet,mskDry,Kvec,Lvec,Kmap,Lmap)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.SeedWetPoints-Tuple{MeshArrays.gcmarray,MeshArrays.gcmarray,MeshArrays.gcmarray,Vararg{Any,N} where N}","page":"API","title":"MeshArrays.SeedWetPoints","text":"SeedWetPoints(tmp::MeshArray,Kmap::MeshArray,Lmap::MeshArray,I...)\n\nSeed a subset of grid points.\n\n(FLDones,FLDkkFROM)=SeedWetPoints(tmp::MeshArray,Kmap::MeshArray,Lmap::MeshArray,I...)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.demo1-Tuple{String}","page":"API","title":"MeshArrays.demo1","text":"demo1(gridChoice::String)\n\nDemonstrate basic functionalities (load grid, arithmetic, exchange, gradient, etc.). Call sequence:\n\n!isdir(\"GRID_LLC90\") ? error(\"missing files\") : nothing\n\n(D,Dexch,Darr,DD)=MeshArrays.demo1(\"LLC90\");\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.demo2-Tuple{}","page":"API","title":"MeshArrays.demo2","text":"demo2()\n\nDemonstrate higher level functions using smooth. Call sequence:\n\n(Rini,Rend,DXCsm,DYCsm)=MeshArrays.demo2();\n\nusing Plots; plotlyjs()\ninclude(joinpath(dirname(pathof(MeshArrays)),\"Plots.jl\"))\nheatmap(Rend,title=\"smoothed noise\",clims=(-0.5,0.5))\nheatmap(Rini,title=\"raw noise\",clims=(-0.5,0.5))\n\n#gr(); contour(Rend,clims=(-0.5,0.5),levels=-0.5:0.1:0.5,fill=true)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.demo3-Tuple{}","page":"API","title":"MeshArrays.demo3","text":"demo3()\n\nDemonstrate ocean transport computations. Call sequence:\n\n(UV,LC,Tr)=MeshArrays.demo3();\nusing Plots; plot(Tr/1e6,title=\"meridional transport\")\n\nusing Plots; plotlyjs()\ninclude(joinpath(dirname(pathof(MeshArrays)),\"Plots.jl\"))\nheatmap(UV[\"U\"],title=\"U comp.\",clims=(-1e7,1e7))\nheatmap(UV[\"V\"],title=\"V comp.\",clims=(-1e7,1e7))\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.fijind-Tuple{MeshArrays.gcmfaces,Int64}","page":"API","title":"MeshArrays.fijind","text":"fijind(A::gcmfaces,ij::Int)\n\nCompute face and local indices (f,j,k) from global index (ij).\n\n(needed in other types?)\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.getindexetc-Union{Tuple{N}, Tuple{T}, Tuple{gcmarray{T,N},Vararg{Union{Colon, Int64, AbstractUnitRange, Array{Int64,N} where N},N}}} where N where T","page":"API","title":"MeshArrays.getindexetc","text":"getindexetc(A::gcmarray, I::Vararg{_}) where {T,N}\n\nSame as getindex but also returns the face size and index\n\n\n\n\n\n","category":"method"},{"location":"API/#MeshArrays.nFacesEtc-Tuple{MeshArrays.gcmarray}","page":"API","title":"MeshArrays.nFacesEtc","text":"nFacesEtc(a::gcmarray)\n\nReturn nFaces, n3 (1 in 2D case; >1 otherwise)\n\n\n\n\n\n","category":"method"}]
}
